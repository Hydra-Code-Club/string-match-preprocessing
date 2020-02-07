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

function getSetForPos(left, right, i)
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

function pickLetter(current, set)
{
    var counts = [];
    for (var i = 0; i < set.length; i++) {
        var letter = set[i];
        if (typeof counts[letter] === 'undefined') {
            counts[letter] = 1;
        } else {
            counts[letter]++;
        }
    }
    if (counts[current] % 2 == 0) {
        return current;
    }
    for (var letter in counts) {
        if (counts[letter] % 2 == 1) {
            return letter;
        }
    }
    return '?';
}

function countSteps(left, right)
{
    preProcessingSteps = 0;
    for (int i = 0; i < left.length; i++) {
        set = getSetForPos(left, right, i);
        newLetter = pickLetter(left.charAt(i), set);
        if (newLetter !== left.charAt(i)) {
            preProcessingSteps++;
            left = left.substring(0, i - 1) + newLetter + left.substring(i);
        }
    }
    console.log("Transformed left = " + left);
    return preProcessingSteps;
}
