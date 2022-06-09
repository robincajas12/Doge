const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
mongoose.connect(process.env.DB_KEY);
async function a(){
    const conn = mongoose.createConnection(process.env.DB_KEY);
// Deletes the entire 'mydb' database
 await conn.dropDatabase();
}
a();
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const registrationController = (req,res)=>{
    User.register({email: req.body.email}, req.body.password, (err, user)=>{
        if(err) console.log(err);
        else passport.authenticate('local')(req,res, ()=>{
            res.redirect('/home');
        })
    });
}

exports.passport = passport;
exports.registrationController = registrationController;