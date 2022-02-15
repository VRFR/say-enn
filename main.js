firebase.initializeApp({
  apiKey: "AIzaSyA4-u-SYNxoQqiz15CFgVkmk2JJCy2kNho",
  authDomain: "sayen-a8208.firebaseapp.com",
  projectId: "sayen-a8208",
});

var db = firebase.firestore();

var app = new Vue({
  el: '#app',
  data: {
      message: 'Hello Vue!'
  },
  methods:{
    kyoka :function(){
      console.log("確認");
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
    console.log("aaaa");
    var docRef = db.collection("Player").doc("Say!");
    docRef
        .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
        });
  }
})