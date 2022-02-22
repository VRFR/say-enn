firebase.initializeApp({
  apiKey: "AIzaSyA4-u-SYNxoQqiz15CFgVkmk2JJCy2kNho",
  authDomain: "sayen-a8208.firebaseapp.com",
  projectId: "sayen-a8208",
});

var db = firebase.firestore();
var music = new Audio('dom.mp3');

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    kasoku:0
  },
  methods:{
    kyoka :function(){
      this.message = "確認"
      DeviceOrientationEvent.requestPermission().then(function (response) {
        if (response === 'granted') {
          window.addEventListener("deviceorientation", deviceOrientation);
        }
      }).catch(function (e) {
        console.log(e);
      });
      DeviceMotionEvent.requestPermission().then(function (response) {
        if (response === 'granted') {
          window.addEventListener("devicemotion", deviceMotion);
        }
      }).catch(function (e) {
        console.log(e);
      });
    },
    test :function(){
      music.play();
    },
    fire :function(){
      db.collection("Player").doc("Say!").set({
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(()=>{
        console.log(db.collection("Player").doc("Say!"));
      })
      .catch((error)=>{
        console.log("error");
      });
    }
  },
  mounted :function(){
    var docRef = db.collection("Player").doc("Say!");
    docRef.onSnapshot((doc) => {
      console.log("aaaa");
      console.log("Current data: ", doc.data());
    });
  }
})

var ck = 0;
var flag = 1;

async function deviceMotion(e) {
  e.preventDefault();
  var ac = e.acceleration;
  var acg = e.accelerationIncludingGravity;
  var rot = e.rotationRate;
  
  var motion = {};
  motion['ac'] = ac;
  motion['acg'] = acg;
  motion['rot'] = rot;

  if(flag == 1){
    if(1.0 < Math.abs(ac.x)){
      flag = 0;
      music.play();
      console.log("Play");
      db.collection("Player").doc("Say!").set({
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(()=>{
        console.log(db.collection("Player").doc("Say!"));
      })
      .catch((error)=>{
        console.log("error");
      });
      window.app.kasoku = ac.x
      ck = ck+1;
      window.app.message = ck
      setTimeout(function(){
        window.app.message = "shake"
        flag = 1;
      },5000);
    }
  }
}

function deviceOrientation(e) {
  e.preventDefault();
  var gamma = e.gamma;
  var beta = e.beta;
  var alpha = e.alpha; 

  var ori = {};
  ori['dir'] = alpha;
  ori['fb'] = beta;
  ori['lr'] = gamma;
}