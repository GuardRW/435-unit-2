class plant {
    constructor(hue, isAlive, isAnimat) {
        this.hue = hue
        this.isAlive = isAlive
        this.isAnimat = isAnimat
        this.maturity = 0
        this.energy = 30
    }

    update() {
        if (this.isAnimat && this.energy < 1) {
            this.isAlive = 0;
            this.isAnimat = false;
            this.energy = 30
        }
        if (this.isAlive) {
            this.maturity++;
            this.energy--;
        } else {
            this.maturity = 0
            this.energy = 30
        }
    }

    mutate(mutater) {
        if (Math.floor(Math.random()*3) === 1) {this.hue = mutater.hue - 10 + randomInt(21)}
        else {this.hue = mutater.hue}
        this.isAlive = 1;
        this.isAnimat = mutater.isAnimat;
    }

    eat(thePlant) {
        if (Math.abs(this.hue - thePlant.hue) <= 200) {
            if (Math.abs(this.hue - thePlant.hue) <= 100) { 
                this.energy += Math.abs(this.hue - thePlant.hue) / 4
            } else {
                this.energy -= Math.abs(this.hue - thePlant.hue) / 4
            }
            thePlant.isAlive = 0;
        }
    }
}