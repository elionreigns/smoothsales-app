import { kv } from "@vercel/kv";

export type FollowUpState = {
  /** Base template id like "elion-laymen" or "tech" (not a followup template). */
  baseTemplateId: string;
  email: string;
  name?: string;
  nameOfOrganization?: string;

  /** ISO timestamp when the initial email was sent. */
  initialSentAt: string;
  /** Resend email id for the initial email. */
  initialEmailId?: string;

  /**
   * Number of follow-ups already sent (0..3).
   * Next follow-up step is sentCount + 1.
   */
  followUpsSent: number;
  lastSentAt?: string;
  lastEmailId?: string;

  openedAt?: string;
  openedEmailId?: string;
  openedTemplateId?: string;
};

function stateKey(baseTemplateId: string, email: string) {
  return `followup_state:${baseTemplateId}:${email}`.toLowerCase();
}

export async function getFollowUpState(baseTemplateId: string, email: string): Promise<FollowUpState | null> {
  const key = stateKey(baseTemplateId, email);
  const v = await kv.get<FollowUpState>(key);
  return v ?? null;
}

export async function upsertFollowUpState(state: FollowUpState): Promise<void> {
  const key = stateKey(state.baseTemplateId, state.email);
  await kv.set(key, state);
}

export async function markOpened(params: {
  baseTemplateId: string;
  email: string;
  openedAt: string;
  openedEmailId?: string;
  openedTemplateId?: string;
}): Promise<void> {
  const existing = await getFollowUpState(params.baseTemplateId, params.email);
  if (!existing) return;
  if (existing.openedAt) return; // keep first open
  await upsertFollowUpState({
    ...existing,
    openedAt: params.openedAt,
    openedEmailId: params.openedEmailId,
    openedTemplateId: params.openedTemplateId,
  });
}

export async function *scanFollowUpStates(prefixBaseTemplateId?: string): AsyncGenerator<FollowUpState> {
  const match = prefixBaseTemplateId
    ? `followup_state:${prefixBaseTemplateId}:*`.toLowerCase()
    : "followup_state:*";
  for await (const key of kv.scanIterator({ match })) {
    const v = await kv.get<FollowUpState>(String(key));
    if (v) yield v;
  }
}

