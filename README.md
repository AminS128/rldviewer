### To search with complex queries

Below code in the browser console:
```js
for(var i = 0; i < Object.keys(results).length; i ++){
    const t = results[Object.keys(results)[i]]
    if(
        // conditions, in this case that the team can do L1,
        // doesn't do defense, and averages over 4 coral scored per game
        t.l1 && !t.doesDefense && t.coralPerGame > 4
    ){console.log(t.team, t.notes)}
}
```
