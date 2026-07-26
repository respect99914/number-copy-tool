let current = [];
let copiedCount = 0;

const flags = {
"Afghanistan":"🇦🇫",
"Albania":"🇦🇱",
"Algeria":"🇩🇿",
"Argentina":"🇦🇷",
"Australia":"🇦🇺",
"Austria":"🇦🇹",
"Bangladesh":"🇧🇩",
"Belgium":"🇧🇪",
"Brazil":"🇧🇷",
"Bulgaria":"🇧🇬",
"Cambodia":"🇰🇭",
"Canada":"🇨🇦",
"Chile":"🇨🇱",
"China":"🇨🇳",
"Colombia":"🇨🇴",
"Croatia":"🇭🇷",
"Czech Republic":"🇨🇿",
"Denmark":"🇩🇰",
"Egypt":"🇪🇬",
"Estonia":"🇪🇪",
"Ethiopia":"🇪🇹",
"Finland":"🇫🇮",
"France":"🇫🇷",
"Germany":"🇩🇪",
"Ghana":"🇬🇭",
"Greece":"🇬🇷",
"Hungary":"🇭🇺",
"India":"🇮🇳",
"Indonesia":"🇮🇩",
"Iran":"🇮🇷",
"Iraq":"🇮🇶",
"Ireland":"🇮🇪",
"Israel":"🇮🇱",
"Italy":"🇮🇹",
"Japan":"🇯🇵",
"Jordan":"🇯🇴",
"Kazakhstan":"🇰🇿",
"Kenya":"🇰🇪",
"Kuwait":"🇰🇼",
"Lebanon":"🇱🇧",
"Libya":"🇱🇾",
"Malaysia":"🇲🇾",
"Mexico":"🇲🇽",
"Morocco":"🇲🇦",
"Myanmar":"🇲🇲",
"Nepal":"🇳🇵",
"Netherlands":"🇳🇱",
"New Zealand":"🇳🇿",
"Nigeria":"🇳🇬",
"Norway":"🇳🇴",
"Oman":"🇴🇲",
"Pakistan":"🇵🇰",
"Palestine":"🇵🇸",
"Philippines":"🇵🇭",
"Poland":"🇵🇱",
"Portugal":"🇵🇹",
"Qatar":"🇶🇦",
"Romania":"🇷🇴",
"Russia":"🇷🇺",
"Saudi Arabia":"🇸🇦",
"Serbia":"🇷🇸",
"Singapore":"🇸🇬",
"South Africa":"🇿🇦",
"South Korea":"🇰🇷",
"Spain":"🇪🇸",
"Sri Lanka":"🇱🇰",
"Sweden":"🇸🇪",
"Switzerland":"🇨🇭",
"Syria":"🇸🇾",
"Thailand":"🇹🇭",
"Tunisia":"🇹🇳",
"Turkey":"🇹🇷",
"UAE":"🇦🇪",
"United Arab Emirates":"🇦🇪",
"UK":"🇬🇧",
"United Kingdom":"🇬🇧",
"Ukraine":"🇺🇦",
"USA":"🇺🇸",
"United States":"🇺🇸",
"Vietnam":"🇻🇳",
"Yemen":"🇾🇪",
"Zimbabwe":"🇿🇼"
};

function detectCountry(text) {
    for (let country in flags) {
        if (text.includes(country)) {
            return country;
        }
    }
    return "Unknown";
}

function getNumbers() {
    const text = document.getElementById("numbers").value;
    const lines = text.split("\n");
    const list = [];

    lines.forEach(line => {
        const match = line.match(/\d{8,15}/);

        if (match) {
            list.push({
                number: match[0],
                country: detectCountry(line),
                copied: false
            });
        }
    });

    return list;
  }
