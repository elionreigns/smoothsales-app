#!/usr/bin/env python3
"""Generate elion-products-programs-100.csv (20 rows per category)."""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "contacts" / "leads" / "elion-products-programs-100.csv"

ai = [
    ("partners@landr.com", "Partnerships", "LANDR", "", "AI recording"),
    ("creators@splice.com", "Creator partnerships", "Splice", "", "AI recording"),
    ("sales@izotope.com", "Sales", "iZotope", "", "AI recording"),
    ("sales@waves.com", "Sales", "Waves Audio", "", "AI recording"),
    ("info@native-instruments.com", "Brand partnerships", "Native Instruments", "", "AI recording"),
    ("support@output.com", "Support", "Output", "", "AI recording"),
    ("support@moises.ai", "Support", "Moises", "", "AI recording"),
    ("support@lalal.ai", "Support", "Lalal.ai", "", "AI recording"),
    ("support@bandlab.com", "Support", "BandLab", "", "AI recording"),
    ("business@elevenlabs.io", "Business", "ElevenLabs", "", "AI recording"),
    ("partnerships@descript.com", "Partnerships", "Descript", "", "AI recording"),
    ("support@soundraw.io", "Support", "Soundraw", "", "AI recording"),
    ("contact@aiva.ai", "Contact", "AIVA", "", "AI recording"),
    ("hello@beatoven.ai", "Hello", "Beatoven.ai", "", "AI recording"),
    ("support@audiomodern.com", "Support", "Audiomodern", "", "AI recording"),
    ("sales@antares.com", "Sales", "Antares Audio Technologies", "", "AI recording"),
    ("support@eventide.com", "Support", "Eventide", "", "AI recording"),
    ("support@celemony.com", "Support", "Celemony (Melodyne)", "", "AI recording"),
    ("support@meldaproduction.com", "Support", "MeldaProduction", "", "AI recording"),
    ("press@suno.com", "Press & partnerships", "Suno", "", "AI recording"),
]

mic = [
    ("proaudio@shure.com", "Pro Audio", "Shure", "", "Mics & preamps"),
    ("sales@rode.com", "Sales", "RODE Microphones", "", "Mics & preamps"),
    ("pro-audio.communications@sennheiser.com", "Pro Audio", "Sennheiser", "", "Mics & preamps"),
    ("audioinfo@atus.com", "Audio Info", "Audio-Technica", "", "Mics & preamps"),
    ("support@focusrite.com", "Support", "Focusrite", "", "Mics & preamps"),
    ("sales@presonus.com", "Sales", "PreSonus", "", "Mics & preamps"),
    ("info@apogeedigital.com", "Info", "Apogee Digital", "", "Mics & preamps"),
    ("hi@seelectronics.co.uk", "Hi", "SE Electronics", "", "Mics & preamps"),
    ("info@astonmics.com", "Info", "Aston Microphones", "", "Mics & preamps"),
    ("info@cloudmicrophones.com", "Info", "Cloud Microphones", "", "Mics & preamps"),
    ("support@tascam.com", "Support", "TASCAM", "", "Mics & preamps"),
    ("service@zoomcorp.com", "Service", "Zoom", "", "Mics & preamps"),
    ("info@warmaudio.com", "Info", "Warm Audio", "", "Mics & preamps"),
    ("sales@uaudio.com", "Sales", "Universal Audio", "", "Mics & preamps"),
    ("info@radialeng.com", "Info", "Radial Engineering", "", "Mics & preamps"),
    ("info@solidstatelogic.com", "Info", "Solid State Logic", "", "Mics & preamps"),
    ("marketing@lewitt-audio.com", "Marketing", "LEWITT", "", "Mics & preamps"),
    ("support@dbxpro.com", "Support", "dbx Professional", "", "Mics & preamps"),
    ("sales@artproaudio.com", "Sales", "ART Pro Audio", "", "Mics & preamps"),
    ("info.neumann@sennheiser.de", "Info", "Neumann", "", "Mics & preamps"),
]

stu = [
    ("sales@fullcompass.com", "Sales", "Full Compass Systems", "", "Studio equipment"),
    ("info@zzounds.com", "Customer service", "zZounds", "", "Studio equipment"),
    ("sales@vintageking.com", "Sales", "Vintage King", "", "Studio equipment"),
    ("sales@sweetwater.com", "Sales", "Sweetwater", "", "Studio equipment"),
    ("corp_sales@bhphotovideo.com", "Corporate sales", "B&H Photo Video", "", "Studio equipment"),
    ("gcpro@guitarcenter.com", "GC Pro", "Guitar Center Pro", "", "Studio equipment"),
    ("info@thomann.de", "Info", "Thomann", "", "Studio equipment"),
    ("sales@adorama.com", "Sales", "Adorama", "", "Studio equipment"),
    ("help@musiciansfriend.com", "Help", "Musician's Friend", "", "Studio equipment"),
    ("service@americanmusical.com", "Service", "American Musical Supply", "", "Studio equipment"),
    ("customerservice@wwbw.com", "Customer service", "Woodwind & Brasswind", "", "Studio equipment"),
    ("support@pitbullaudio.com", "Support", "Pitbull Audio", "", "Studio equipment"),
    ("kraft@kraftmusic.com", "Sales", "Kraft Music", "", "Studio equipment"),
    ("samashcares@samash.com", "Customer care", "Sam Ash", "", "Studio equipment"),
    ("support@austinbazaar.com", "Support", "Austin Bazaar", "", "Studio equipment"),
    ("partnerships@reverb.com", "Partnerships", "Reverb", "", "Studio equipment"),
    ("sales@soundpure.com", "Sales", "Sound Pure", "", "Studio equipment"),
    ("info@frontendaudio.com", "Info", "Front End Audio", "", "Studio equipment"),
    ("sales@recordingstore.com", "Sales", "The Recording Store", "", "Studio equipment"),
    ("info@audiodeluxe.com", "Info", "Audio Deluxe", "", "Studio equipment"),
]

cam = [
    ("support@blackmagicdesign.com", "Support", "Blackmagic Design", "", "HD cameras"),
    ("support@atomos.com", "Support", "Atomos", "", "HD cameras"),
    ("prosupport@cusa.canon.com", "Pro support", "Canon USA Professional", "", "HD cameras"),
    ("pro.sony@am.sony.com", "Pro support", "Sony Professional Solutions", "", "HD cameras"),
    ("partners@gopro.com", "Partners", "GoPro", "", "HD cameras"),
    ("sales@red.com", "Sales", "RED Digital Cinema", "", "HD cameras"),
    ("business@insta360.com", "Business", "Insta360", "", "HD cameras"),
    ("support@aputure.com", "Support", "Aputure", "", "HD cameras"),
    ("support@zhiyun-tech.com", "Support", "Zhiyun", "", "HD cameras"),
    ("info@godox.com", "Info", "Godox", "", "HD cameras"),
    ("service@sigmaphoto.com", "Service", "Sigma", "", "HD cameras"),
    ("service@tamron.com", "Service", "Tamron", "", "HD cameras"),
    ("info.bogen@manfrotto.com", "Info", "Manfrotto", "", "HD cameras"),
    ("support@smallrig.com", "Support", "SmallRig", "", "HD cameras"),
    ("support@convergentdesign.com", "Support", "Convergent Design", "", "HD cameras"),
    ("provideo@panasonic.com", "Pro video", "Panasonic Professional", "", "HD cameras"),
    ("ffmail@ffinc.com", "Pro photo", "FUJIFILM North America", "", "HD cameras"),
    ("support@getolympus.com", "Support", "OM SYSTEM / Olympus", "", "HD cameras"),
    ("info@z-cam.com", "Info", "Z CAM", "", "HD cameras"),
    ("americas@arri.com", "Americas", "ARRI Inc.", "", "HD cameras"),
]

dro = [
    ("enterprise@dji.com", "Enterprise", "DJI", "", "Follow drones"),
    ("sales@skydio.com", "Sales", "Skydio", "", "Follow drones"),
    ("support@auteldrones.com", "Support", "Autel Robotics", "", "Follow drones"),
    ("support@hoverair.com", "Support", "HOVERAir", "", "Follow drones"),
    ("enterprise@parrot.com", "Enterprise", "Parrot", "", "Follow drones"),
    ("support@potensic.com", "Support", "Potensic", "", "Follow drones"),
    ("support@holystone.com", "Support", "Holy Stone", "", "Follow drones"),
    ("support@ryzerobotics.com", "Support", "Ryze Tech (Tello)", "", "Follow drones"),
    ("support@yuneec.com", "Support", "Yuneec", "", "Follow drones"),
    ("info@swellpro.com", "Info", "SwellPro", "", "Follow drones"),
    ("support@chasing.com", "Support", "CHASING", "", "Follow drones"),
    ("support@fimi.com", "Support", "FIMI", "", "Follow drones"),
    ("support@hubsan.com", "Support", "Hubsan", "", "Follow drones"),
    ("support@contixo.com", "Support", "Contixo", "", "Follow drones"),
    ("service@syma.com", "Service", "Syma", "", "Follow drones"),
    ("support@jjrc.com", "Support", "JJRC", "", "Follow drones"),
    ("support@ruko.net", "Support", "Ruko", "", "Follow drones"),
    ("info@exo.inc", "Partnerships", "EXO Drones", "", "Follow drones"),
    ("support@caddxfpv.com", "Support", "Caddx / Walksnail FPV", "", "Follow drones"),
    ("service@walkera.com", "Service", "Walkera", "", "Follow drones"),
]

rows = ai + mic + stu + cam + dro
assert len(rows) == 100
emails = [r[0] for r in rows]
assert len(emails) == len(set(emails)), "duplicate emails"

OUT.parent.mkdir(parents=True, exist_ok=True)
with OUT.open("w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["email", "name", "nameOfOrganization", "phone", "category"])
    w.writerows(rows)
print("Wrote", OUT, "rows", len(rows))
