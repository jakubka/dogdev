(function(w) {
    var P = w.P,
        nextPlayerId = 0,

        Player = function(username) {
            this.id = nextPlayerId++;
            this.name = username || "defaultname";
            this.orientation = null;
            fragsCount = 0;
        };

    P.Player = Player;

}(this));
