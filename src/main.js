(function(w) {
    var $ = w.$,
        P = w.P,
        Player = P.Player,
        Creature = P.Creature,
        Creatures = [],
        Marian = new Player("Marian"),
        i = 0;


    for (i; i < 10; i++) {
        Creatures.push(new Creature());
    }

    // expose for debuggine
    w.Creatures = Creatures;


}(this));
