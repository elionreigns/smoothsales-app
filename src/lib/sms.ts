import { type TemplateId } from "@/lib/templates";

/**
 * SMS teaser copy (2 sentences): (1) question hook, (2) statement tells them what to do next.
 * Keep it short; SMS may be concatenated automatically.
 */
export function getSmsTeaser(templateId: TemplateId): string {
  const baseId = String(templateId)
    .replace(/-followup-\d+$/g, "")
    .replace(/-v2$/g, "") as TemplateId;

  switch (baseId) {
    case "botox":
      return "Want clearer, younger-looking skin without guesswork? Click to view the Botox Oahu pitch and reply to book an easy consult.";
    case "tech":
      return "Do you want a website + SEO that brings more bookings in Hawaii? Click to open the Coral Crown Tech pitch and tell me what you sell.";
    case "elion-leaders":
      return "Would you take 60 seconds to see what P48X + PrayerAuthority could add to your church or leaders group? If it resonates, click to view the exact pitch and I’ll tailor options + a setlist for your dates.";
    case "elion-laymen":
      return "Want one place to see my new songs, P48X, and Prayer Authority tools? Click the link to read the full message and take the easiest next step.";
    case "elion-fans":
      return "Do you want more faith-forward music that actually hits, not just inspiration? Click to listen + follow and see what’s new from E Lion right now.";
    case "elion-artists":
      return "Are you an artist who would like a real, respectful collaboration? Click to review the offer and reply with your idea (verse/feature or bigger).";
    case "elion-brands":
      return "Would you like your brand placed in front of an engaged faith-forward audience? Click to see the sponsor pitch and what you’d get for product or store credit.";
    case "elion-producers":
      return "Would you take a minute to check if your beats fit E Lion’s sound? Click to review the producer pitch and reply if you’re down for exclusive credit.";
    case "elion-venue-church":
      return "Church leaders: would you be open to Holy Hip-Hop + worship + a PrayerAuthority demo at your event? Click to see the full church pitch and what I can bring for your dates.";
    case "elion-venue-show":
      return "Want an act that promotes locally and delivers door + merch + a full set? Click to open the venue pitch and reply with your venue/date.";
    case "elion-venue-dj":
      return "Are you planning an event that needs a clean, high-energy DJ set? Click to see the DJ/artist pitch and the next step to lock details.";
    case "elion-venue-major":
      return "Do you have (or expect) opening slots for great local/regional talent? Click to review E Lion’s opening pitch and reply if you’d like credentials + setlist.";
    case "elion-levelup":
      return "A&R/industry: would you take 60 seconds to see the numbers and links behind E Lion? Click to view the level-up pitch and reply if you want the full proposal.";
    case "elion-products-programs":
      return "If you make tools or gear for creators, would you want to be featured to my audience? Click to review the partnership pitch and tell me what you offer.";
    case "elion-record-label-mainstream":
    case "elion-record-label-christian":
      return "Record label decision-makers: want to review E Lion’s catalog and what a release could look like? Click to view the label pitch and reply if you’re interested in next steps.";
    case "prayer-individual":
      return "Want free PrayerAuthority tools that help you journal, interpret, and move forward? Click to see the exact link and claim access.";
    case "prayer-church":
      return "Would your congregation benefit from PrayerAuthority tools (requests, journals, chatbots)? Click to view the church pitch and reply if you want a quick call.";
    case "p48x-personal":
      return "Are you ready for a daily tool that puts your mind on what’s true and lovely? Click to open the P48X pitch and choose the easiest way to start.";
    case "p48x-physical-distributors":
      return "Do you run a store or distribution channel that wants a ready-to-sell mind-renewal book? Click to view the physical-distributor pitch and reply with your details.";
    case "p48x-affiliate-sellers":
      return "Want to earn 15% on P48X sales without holding inventory? Click to open the affiliate pitch and tell me how you’d sell it.";
    case "wedding-couples":
      return "Planning a Hawaii wedding and want one clear place to plan the whole thing? Click to view the couples pitch and reply with your date so I can guide you.";
    case "wedding-contractors":
      return "If you’re a vendor, would you want to get featured to engaged Hawaii couples? Click to view the contractor pitch and reply with what you offer.";
    case "tourism-hawaii":
      return "Want exclusive Hawaii tour deals tied to referrals? Click to view the Oahu/Maui/Big Island pitch and tell me your dates.";
    case "tourism-hawaii-featured-tour":
      return "Have a yacht/sailboat and want referral visibility from a growing audience? Click to view the featured-tour pitch and reply with availability.";
    case "tourism-usa":
      return "Would you like a chance to take one of the complimentary vacations? Click to view the USA pitch and reply if you want details.";
    case "healing-herbals-smoke-shop":
      return "Retail buyers: want to stock healing herbals people actually ask for? Click to view the wholesale pitch and reply with your store details.";
    case "healing-herbals-individual":
      return "Want a simple way to choose kava/blue lotus products that match your needs? Click to view the individual pitch and see the options.";
    case "yachts-contracts":
      return "Charter operators: want referrals and a clear commission agreement? Click to view the charter-contract pitch and reply with your details.";
    case "yachts-clients":
      return "Considering private boat charter soon? Click to answer the quick questionnaire and we’ll match you to the right option.";
    case "stella-brands":
      return "Would you like your brand featured next to the cutest corgi on the internet? Click to view the sponsor pitch and reply with your product idea.";
    case "stella-media":
      return "Media/press: want Stella the corgi featured in your story or campaign? Click to view the media pitch and tell me your outlet.";
    case "stella-talent":
      return "Are you casting and looking for a lovable, camera-ready talent? Click to view the talent pitch and reply with your booking request.";
    case "apartments-individual":
      return "Quick one – is your East Honolulu unit still available? Click to read 4 lines about us (couple, expecting, two well-trained dogs, ground-floor or elevator preferred).";
    case "apartments-realtor":
      return "Do you have anything that would fit a 3BR/2BA East Honolulu rental for an expecting couple at $2.4–$2.6k? Click to view our 1-page renter packet and forward to your team.";
    case "corgi-care-hair":
      return "Do you have an opening this month for a 13-year-old corgi who needs a deshed + blowout (no shaving)? Click to see exactly what we need.";
    case "corgi-care-teeth":
      return "Quick question – do you offer a $300–$500 anesthesia teeth-cleaning package for a senior corgi? Click to see what we are looking for.";
    case "corgi-care-military":
      return "Would you take 30 seconds to share your military-family rate for a senior corgi teeth cleaning? Click to view the request – my wife’s cousin is the dependent.";
    case "luxury-resource-fareharbor":
      return "Would you be open to having Hawaii Luxury Resource added as an individual affiliate on your FareHarbor (10%, terms transparent)? Click to view the 60-second how-to.";
    case "luxury-resource-direct":
      return "If you don’t use FareHarbor – would you be open to a simple referral agreement with Hawaii Luxury Resource (10% on tracked bookings)? Click to view the contract draft.";
    case "rap-central-rappers":
      return "Would you say no to more booking offers from vetted promoters for just 5%? Click to view the Rap Artist Booking Engine pitch and your requirements form.";
    default:
      return "Will you take 60 seconds to read this and reply with your thoughts? Click to open the full pitch and choose the next step.";
  }
}

