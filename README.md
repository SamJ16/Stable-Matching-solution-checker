This JavaScript file has an oracle function which takes in an arbitrary function that solves the Stable Matching problem.
The function passed in must have the following parameters in the following order: list of proposers (with preferences), list of proposed (with preferences).
The oracle function will verify that there is a match for every proposer and proposed.
It will then check if any proposer wants someone available who's better than their current match, or if any proposed wants someone available who's better than their current match (instability).

People who want to use the file should probably comment out the last line that says "oracle(wheat1);" as wheat1 was a custom algorithm provided for students in COMPSCI 220 at UMass.
