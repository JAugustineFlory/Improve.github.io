//Honours App
const honours = [
    // Knight's collection
    //Code of Chivalry translated from The Song of Roland 
    knightsCode = [
        'To fear God and maintain His Church',
        'To serve the liege lord in valour and faith',
        'To protect the weak and defenceless',
        'To give succour to widows and orphans',
        'To refrain from the wanton giving of offence',
        'To live by honour and for glory',
        'To despise pecuniary reward',
        'To fight for the welfare of all',
        'To obey those placed in authority',
        'To guard the honour of fellow knights',
        'To eschew unfairness, meanness and deceit',
        'To keep faith',
        'At all times to speak the truth',
        'To persevere to the end in any enterprise begun',
        'To respect the honour of women',
        'Never to refuse a challenge from an equal',
        'Never to turn the back upon a foe'
    ],
    //Knight's Code as determined by the Duke of Burgundy
    knightsCodeBurgandy = [
        'Faith',
        'Charity',
        'Justice',
        'Sagacity',
        'Prudence',
        'Temperance',
        'Resolution',
        'Truth',
        'Liberality',
        'Diligence',
        'Hope',
        'Valor'
    ],
    //Samurai Collection
    bushido = [
        'Justice - 義, gi',
        'Courage - 勇, yū',
        'Benevolence - 仁, jin',
        'Respect - 礼, rei',
        'Integrity - 誠, makoto',
        'Honor - 名誉, meiyo',
        'Loyalty - 忠義, chūgi',
        'Self-Control - 自制, jizai'
    ]
];

// Add category/author names in the same order as honours arrays
const honourCategories = [
    "Knight's Code (Song of Roland)",
    "Knight's Code (Duke of Burgundy)",
    "Bushido"
];


//Wraps all into nice function
function honour() {
    const categoryIndex = Math.floor(Math.random() * honours.length);
    const category = honours[categoryIndex];
    const categoryName = honourCategories[categoryIndex];
    const choiceIndex = Math.floor(Math.random() * category.length);
    const output = category[choiceIndex];
    const h2 = document.getElementById('honourText');
    if (h2) {
        h2.textContent = `${output} — ${categoryName}`;
    }
};