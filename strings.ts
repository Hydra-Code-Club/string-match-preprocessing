/*
No preprocessing:
left = aaaa; right = aaaa
left = aaaa; right = bbbb
left = aaab; right = baaa

Nightmare scenario (all pre-processing):
left = abcd; right = efgh

Same letters, but preprocessing required due to order:
left = abcd; right = badc

Odd number of letters:
left = abcde; right = fghij

We learn: if a letter can't possibly get into the right position from swaps within its word,
it's going to require preprocessing.

For the full set of letters, is each included twice?
For each position, what are the values that could be there?
  - Also answers the above question
  - Move from there to reconciling all those possibilities
  - Look at the 4 mirrored positions together
  - There's a special case for odd-numbered lenghts (the middle letter)
  - For each given position, iterate over the charaters.
    - If the current character doesn't have a match, change it so it has one
      (favor other unmatched characters when making selections).
        - Count each character change as a preprocessing step


 */

function getSetForPos(left: string, right: string, i: number): Array<string>
{
    // Whenhere's an odd number of characters in the words;
    //    account for the middle letter, which can only have 2 values.
    if (left.length - i - 1 == i) {
        return [
            left.charAt(i),
            right.charAt(i)
        ];
    }
    return [
        left.charAt(i),
        right.charAt(i),
        left.charAt(left.length - i - 1),
        right.charAt(right.length - i - 1),
    ];
}

function pickLetter(current: string, set: Array<string>): string
{
    var counts: {[key: string]: number} = {};
    for (var i: number = 0; i < set.length; i++) {
        var letter: string = set[i];
        if (typeof counts[letter] === 'undefined') {
            counts[letter] = 1;
        } else {
            counts[letter]++;
        }
    }
    if (counts[current] % 2 == 0) {
        return current;
    }
    for (var currentLetter in counts) {
        if (counts[currentLetter] % 2 == 1) {
            return currentLetter;
        }
    }
    return '?';
}

function countSteps(left: string, right: string): number
{
    var preProcessingSteps: number = 0;
    for (var i: number = 0; i < left.length; i++) {
        var set: Array<string> = getSetForPos(left, right, i);
        var newLetter: string = pickLetter(left.charAt(i), set);
        if (newLetter !== left.charAt(i)) {
            preProcessingSteps++;
            left = left.substring(0, i - 1) + newLetter + left.substring(i);
        }
    }
    console.log("Transformed left = " + left);
    return preProcessingSteps;
}

var tests: Array<Array<string>> = [
    ['aaaa', 'aaaa', 'No preprocessing'],
    ['aaaa', 'bbbb', 'No preprocessing'],
    ['aaab', 'baaa', 'No preprocessing'],
    ['abcd', 'efgh', 'Nightmare scenario (all pre-processing)'],
    ['abcd', 'badc', 'Same letters, but preprocessing required due to order'],
    ['abcde', 'fghij', 'Odd number of letters'],
];

for (var i: number = 0; i < tests.length; i++) {
    console.log(tests[i][2] + ": left = " + tests[i][0] + ", right = " + tests[i][1]);
    console.log("preprocessing steps = " + countSteps(tests[i][0], tests[i][1]));
}