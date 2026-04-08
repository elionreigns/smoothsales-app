#!/usr/bin/env node
/**
 * Second researched pass: youth pastors + conference/event coordinators.
 * Sends elion-leaders with a dedicated subject line via subjectOverride.
 */

const TARGETS = [
  { email: "shauncastro@gracehonolulu.org", name: "Shaun", nameOfOrganization: "Grace Bible Church Honolulu Youth Ministry" },
  { email: "sspeterpaul.youthministry@gmail.com", name: "Youth Ministry Team", nameOfOrganization: "Saints Peter and Paul Honolulu" },
  { email: "hym@hawaiiaog.com", name: "HYM Team", nameOfOrganization: "Hawaii Youth Ministries AG" },
  { email: "hym.hawaiiyouthministry@gmail.com", name: "Hawaii Youth Ministries", nameOfOrganization: "Hawaii Youth Ministries" },
  { email: "info@yfchawaii.org", name: "YFC Hawaii Team", nameOfOrganization: "Youth for Christ Hawaii" },
  { email: "chapelhickam@gmail.com", name: "Hickam Chapel Team", nameOfOrganization: "Hickam Chapel Center" },
  { email: "aidan.e.hernandez3.mil@us.navy.mil", name: "Aidan", nameOfOrganization: "Pearl Harbor Memorial Chapel" },
  { email: "kagofficemanager@gmail.com", name: "Kailua Assembly Office", nameOfOrganization: "Kailua Assembly of God" },
  { email: "community@ywamhonolulu.com", name: "YWAM Team", nameOfOrganization: "YWAM Honolulu" },
  { email: "web@calvarychapelhonolulu.com", name: "Calvary Honolulu Team", nameOfOrganization: "Calvary Chapel Honolulu" },
  { email: "frontdesk@hawaiisda.com", name: "SDA Front Desk", nameOfOrganization: "Hawaii Conference SDA" },
  { email: "info@hawaiisda.com", name: "Hawaii SDA Team", nameOfOrganization: "Hawaii Conference SDA" },
  { email: "hcucc@hcucc.org", name: "HCUCC Office", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "dpopham@hcucc.org", name: "David", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "jroach@hcucc.org", name: "Jonathan", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "lyamashiro@hcucc.org", name: "Lori", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "jbuto@hcucc.org", name: "Julie", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "cohawaii@gmail.com", name: "Contemplative Outreach", nameOfOrganization: "Contemplative Outreach Hawaii" },
  { email: "bcorrea@foursquare.org", name: "Bunny", nameOfOrganization: "Foursquare Pacific District Hawaii" },
  { email: "info@lifechristianhawaii.org", name: "Life Christian Team", nameOfOrganization: "LIFE Christian Church Hawaii" },
  { email: "office@honoluluchristian.org", name: "Honolulu Christian Office", nameOfOrganization: "Honolulu Christian Church" },
  { email: "office@calvarychapelkaneohe.com", name: "Calvary Kaneohe Office", nameOfOrganization: "Calvary Chapel Kaneohe" },
  { email: "aloha@kcc1834.org", name: "KCC Team", nameOfOrganization: "Kaneohe Congregational Church" },
  { email: "pastortimnelson@gmail.com", name: "Pastor Tim", nameOfOrganization: "Kaneohe SDA Church" },
  { email: "wmcmm2013@gmail.com", name: "Windward Missionary Team", nameOfOrganization: "Windward Missionary Church" },
  { email: "info@newhopeleeward.org", name: "New Hope Leeward Team", nameOfOrganization: "New Hope Leeward" },
  { email: "waipahuucc@gmail.com", name: "Waipahu UCC Team", nameOfOrganization: "Waipahu UCC" },
  { email: "info@hopechapelmililani.org", name: "Hope Chapel Team", nameOfOrganization: "Hope Chapel Mililani" },
  { email: "rich@nhcohawaii.org", name: "Rich", nameOfOrganization: "New Hope Central Oahu" },
  { email: "jobs@trinityeventstaffing.com", name: "Twalla", nameOfOrganization: "Trinity Event Staffing" },
  { email: "367942@gmail.com", name: "MDI Team", nameOfOrganization: "MDI Conference" },
];

const SUBJECT =
  "Hawaii youth and conference invite: P48X keynote, testimony, and live music for your next event";

const baseUrl = process.env.SMOOTHSALES_URL || "https://smoothsales-app.vercel.app";
const accessKey = process.env.SMOOTHSALES_BYPASS_KEY || process.env.SMOOTHSALES_PASSWORD || "13lion$ales";

async function run() {
  const recipients = TARGETS.map((t) => ({
    email: t.email.trim().toLowerCase(),
    name: t.name || "there",
    nameOfOrganization: t.nameOfOrganization || undefined,
  }));

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/send-campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Smoothsales-Access": accessKey,
    },
    body: JSON.stringify({
      templateId: "elion-leaders",
      subjectOverride: SUBJECT,
      recipients,
    }),
  });

  const text = await res.text();
  console.log("status", res.status);
  console.log(text);
  if (!res.ok) process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

