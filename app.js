import express from "express"
import bodyparser from "body-parser"
import ejs from "ejs"
import _ from "lodash"
import mongoose from "mongoose"
 mongoose.connect("mongodb://127.0.0.1:27017/newsDB", { useNewUrlParser: true })
                

const app = express();
const port = 3000;

const homestartingcontent="A typical day for me as a coding student involves starting with a morning routine, checking emails and notifications, followed by attending lectures or working on self-study through textbooks and online courses. Throughout the day, I dedicate time to coding practice, whether it's working on personal projects, solving coding challenges, or participating in coding competitions. Collaboration with classmates and networking in coding communities are important aspects, along with problem-solving and debugging code. I also make it a point to document my progress and reflect on my learnings daily. Health and well-being are priorities, so I take breaks, eat healthily, and get enough rest. Additionally, I manage my projects using tools like Trello and GitHub Projects, ensuring I stay organized and on track towards achieving my coding goals."
const aboutcontent="As a coding student, I bring several valuable qualities to the table. First and foremost, I have a strong passion for learning and exploring new technologies. I thrive on challenges and am constantly seeking opportunities to expand my knowledge and skills in the field of computer science. My curiosity drives me to delve deep into complex concepts, and I have a knack for breaking down intricate problems into manageable tasks. Additionally, I possess excellent problem-solving abilities, which allow me to tackle coding challenges with creativity and efficiency. I am a proactive and self-motivated learner, always eager to take on new projects and collaborate with peers to achieve common goals.Furthermore, I am resilient in the face of setbacks, understanding that failures are opportunities for growth and learning. With a growth mindset and a commitment to continuous improvement, I am poised to make meaningful contributions to the ever-evolving world of technology."
const contactcontent="If you have any questions, feedback, or inquiries, I'm here to help! Please feel free to reach out to me via email at [Your Email Address]. Whether you have a specific question about a project, need assistance with a technical issue, or simply want to connect, I'm available to lend a hand. Additionally, if you prefer to discuss matters over the phone, you can contact me at [Your Phone Number]. Your communication is important to me, and I strive to respond promptly and provide the assistance you need. Don't hesitate to get in touch—I'm looking forward to hearing from you!.I am a proactive and self-motivated learner, always eager to take on new projects and collaborate with peers to achieve common goals.Furthermore, I am resilient in the face of setbacks, understanding that failures are opportunities for growth and learning. With a growth mindset and a commitment to continuous improvement, I am poised to make meaningful contributions to the ever-evolving world of technology."
const Newsschema = new mongoose.Schema({
    title:String,
    matter:String
});
const Paper=mongoose.model("Paper",Newsschema);

app.set('view engine','ejs')
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}))


app.get("/", async (req, res) => {
    const paps = await Paper.find();
    if (paps.length === 0) {
      const news1 = new Paper({
        title: "Home",
        matter: homestartingcontent
      });
      await news1.save();
      res.redirect("/");
    } else {
   
      res.render("home", {
        
        forapp: paps
      });
    }
  });

app.get("/about",(req,res)=>{
    res.render("about",{about:aboutcontent})
})
app.get("/contact",(req,res)=>{
    res.render("contact",{contact:contactcontent})
})
app.get("/compose",(req,res)=>{
    res.render("compose")
})
app.post("/compose",(req,res)=>{
   const news2 = new Paper({
    title:req.body.title,
    matter:req.body.area
   })
   news2.save()
   res.redirect("/")
})
app.get("/posts/:postname", async (req, res) => {
  const inputparam = _.toLower(req.params.postname);
  const papes = await Paper.find({});
  papes.forEach(function(element) {
    const givenparam = _.toLower(element.title);
    if (inputparam === givenparam) {
      res.render("post", {
        postedtitle: element.title,
        postedcontent: element.matter
      });
    }
  });
});

app.listen(port,()=>{
    console.log("hi")
}

)
