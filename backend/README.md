# Scheduling Function Explanation

This function takes into account several factors:

\- Nurses' availability

\- Nurses' preferences

\- Nurses' Number of shifts marked as preferred

\- Shift requirements

\- Double shifts

 \n 

## Assignment Algorithm Pseudocode:

Let N -> the set of all nurses

Let P -> the subset of N who have shift x selected as preferred

Let F -> the subset of N for whom the assignment of this shift would not result in a double shift

Let L -> the subset of N for whom the assignment of this shift would not cause them to

exceed the number of shifts marked as available

 \n 

Round 0: Sort N by number of shifts marked available. We don't want to penalize someone for only marking 3 shifts

as preferred

Round 1: Take nurses from G_1 -> P & F & L until we either reach nurses required or exhaust group

Round 2: If we need more nurses, repeat with G_2 -> P' & L & F

Round 3: If needed, repeat with G_3 -> G_2 -> P & L & F'

FINALLY: In the absolute worst case scenario, draw randomly from N,

checking we aren't assigning the same person twice.

 \n 

At all points, return if we've met the requested number or if all nurses have been assigned to the shift

 \n 

Time Complexity of this algorithm is O(nLog(n))