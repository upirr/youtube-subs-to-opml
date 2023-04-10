import fs from 'fs';

const fileContents = fs.readFileSync("./subscriptions.csv").toString()
const rows = fileContents.split("\n");

let outputContents =
`<?xml version="1.0"?>
<opml version="1.0"><body><outline title="YouTube Subscriptions">`
for (const row of rows) {
	const [ channelId, url, rawTitle ] = row.split(`,`);
	const title = rawTitle?.replace('&', '&amp;')
	outputContents += `<outline type="rss" text="${title}" title="${title}" xmlUrl="https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}" />\n`
}
outputContents += "</outline></body></opml>"

fs.writeFileSync("./subs.opml", Buffer.from(outputContents))
//xmlUrl="https://www.youtube.com/feeds/videos.xml?channel_id={channelId}"
