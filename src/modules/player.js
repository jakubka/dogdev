(function(w) {
    var P = w.P,
        nextPlayerId = 0,
        ko = w.ko,

        Player = function(username) {
            this.id = nextPlayerId++;
            this.name = username || "defaultname";
            this.orientation = ko.observable();
            fragsCount = 0;
        };

    P.Player = Player;

}(this));
