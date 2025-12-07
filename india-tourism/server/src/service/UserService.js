const {UserRepository} = require ('../../dist/repository/UserRepository');
const constants = require("../utils/constants");
require("../logNginx");

class UserService{
   

constructor(){
      this.errorMsg = "Message not found";
    } 

async signupUser(email,mobile,name,signUpOTP)
{
  try{
  const userRepo = new UserRepository();
  let user = await userRepo.findOne({"emailID": email,"mobile":mobile, "name":name});
          if (!user) {
            console.log('Creating user entity..');
            user = await userRepo.create({"emailID": email,"mobile":mobile, "name":name,"signedUpFlag":"N",
              "otp":signUpOTP
             });
            console.log('Signed up user successfully with object id ',user._id);
            return constants.YES;
          }else{
            console.log('User is signed up already');
             return constants.EXISTS;
          }
        }catch(err){
        
        logNginx(err.stack)
      }
}

async updateLoginOTP(email,mobile,loginOTP)
{
  try{
  const userRepo = new UserRepository();
  let user = await userRepo.findOne({"emailID": email,"mobile":mobile });
          if (user) {
            user = await userRepo.update(user._id,{"otp":loginOTP});
            console.log(' Login OTP updated successfully for user');
            return constants.YES;
          }else{
            console.log('Login failed');
             return constants.NO;
          }
        }catch(err){
        
        logNginx(err.stack)
      }
      console.log('Login failed');
      return constants.NO;
}



async loginUser(email,mobile,loginOTP)
{
  try{
  const userRepo = new UserRepository();
  let queryStr = '';
  if(email && mobile){
    queryStr = {"emailID": email,"mobile":mobile,"signedUpFlag":"Y" };
  }
  else if(email && !mobile)
  {
     queryStr = {"emailID": email,"signedUpFlag":"Y" };
  }
  else if(!email && mobile)
  {
     queryStr = {"mobile": mobile,"signedUpFlag":"Y" };
  }
  else{
         console.log('Login failed');
             return constants.NO;
  }
  let user = await userRepo.findOne(queryStr);
          if (user) {
            user = await userRepo.update(user._id,{"otp":loginOTP});
            if(user)
            {
              console.log('user logged in successfully');
              return constants.YES;
            }else{
            console.log('Login failed');
             return constants.NO;
          }
          }else{
            console.log('User not signed up yet');
             return constants.NO_USER_FOUND;
          }
        }catch(err){
        
          logNginx(err.stack)
      }
     
}
async validateOTP(email,mobile,otp)
{
  try{
  const userRepo = new UserRepository();
 
  let user = await userRepo.findOne({"emailID": email,"mobile":mobile, "otp":otp });

  console.log('user....',user);

  if(user){
     console.log('valid otp');
    let _id = user._id;
    console.log('Update signed up flag to Yes');
   let  user2 = await userRepo.update(_id,{$set:{"signedUpFlag":"Y"}});
    if(user2)
    {
     console.log('update status successfully for username ...',user.name);
     return user.name;
    
   }
    else
      {
         console.log('failed to update status ...');
        return constants.NO;
      }
  }else{
        console.log('invalid otp...');
        return constants.NO;
  }
}
catch(err){
       logNginx(err.stack)
      }
}

async getPoints(email,mobile) 
{
   let points = 0;
  try{
    const userRepo = new UserRepository();
   
    let user = await userRepo.findOne({"emailID": email,"mobile":mobile});
  
          if (user) {
             console.log('found user profile...');
              points = user.points;
            }else{
              console.log('could not find user profile...');
              points = 0;
            }
          }catch(err)
          {
            logNginx(err.stack)
          }
            return points;
  }

}
module.exports = UserService;



