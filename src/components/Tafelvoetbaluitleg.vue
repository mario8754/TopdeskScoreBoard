<template>

<v-container>


    <div style="margin-top:25px;margin-bottom:25px">
<h3 ><b>Game rules</b></h3>

    </div>
    <p>
    1. Scoring is done exclusively with the attackers, defenders or goalkeeper; when a midfielder shoots a ball into the goal, it does not count as a goal.<br>
    2.Do not twist the sticks. If this causes a ball to end up in the goal, it does not count as a goal.<br>
    3. When the ball is at rest, do not lift the table by the sticks. They can bend from this.<br>
    4. If a vowel (= ball comes back out of the goal after scoring) is made, one point is deducted from the other team.<br>
    5. When the final score is 10-0, the losing side has to crawl under the table.<br>
    6. The difference in score must be at least 2 points. </p>

<div style="margin-top:10px">
  <h3><b>Spel uitleg</b></h3>
  <p>
       1.Scoren gebeurt uitsluitend met de aanvallers, verdedigers of keeper; wanneer een middenvelder een bal in het doel schiet, telt dit niet als goal.<br>
    2.Draai de stokken niet rond. Wanneer hierdoor een bal in het goal belandt telt dit niet als goal.<br>
    3.Wanneer de bal stil ligt, til de tafel dan niet op aan de stokken. Hier kunnen ze van buigen.<br>
    4.Als er een klinker (= bal komt weer terug uit het goal na te hebben gescoord) gemaakt is, gaat er een punt af bij het andere team.<br>
    5.Wanneer de eindscore 10-0 is, dient de verliezende partij onder de tafel door te kruipen.<br>
    6.Het verschil in score dient ten minste 2 punten te zijn.</p>

</div>
</v-container>
</template>
<script>

  export default {
    data: () => ({
      show: false,
    }),
     mounted() {
      this.myMethod();
    },
    methods: {
      myMethod() {
       this.$confetti.stop()
      }
    },
  }
</script>