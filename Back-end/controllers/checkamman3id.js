
const knex = require('knex')(require('../knexfile').development);

const checkamman3id = async (req, res) => {


  try {
  

    
 

    const { muslimone, muslimtwo, muslimthree, muslimfour, femaleQuota, circassian ,listID} = req.body;

    console.log(muslimone, muslimtwo, muslimthree, muslimfour, femaleQuota, circassian ,listID);
    if (!muslimone || !muslimtwo || !muslimthree || !muslimfour || !circassian || !femaleQuota) {
      return res.status(400).json("Missing required fields");
    }
    

    const lists = await knex('citizens').select('national_id', 'gender', 'religion', 'electoral_district', 'name');
    console.log("Lists query result:", lists);

    let muslimCheck = false;
    let femaleCheck = false;
    let circassiancheck=false;

    const findCandidate = (id) => lists.find(list => list.national_id === id);

    const candidatesToCheck = [muslimone, muslimtwo, muslimthree, muslimfour];
    let invalidMuslimId = null;

    for (const id of candidatesToCheck) {
      const candidate = findCandidate(id);
      if (candidate) {
        if (candidate.religion === 'مسلم') {
          if (candidate.electoral_district === 'الدائرة الثالثة') {
            muslimCheck = true;
          } else {
            return res.status(400).json(`يجب أن يكون المرشح بالرقم الوطني ${candidate.national_id}يتبع للدائرة الثالثة`);
          }
        } else {
          return res.status(400).json(`يجب أن يكون المرشح بالرقم الوطني ${candidate.national_id} عن المقاعد التنافسية مسلم`);
        }
      } else {
        invalidMuslimId = id;
        break;
      }
    }

    if (invalidMuslimId) {
      return res.status(400).json(`الرقم الوطني ${invalidMuslimId} للمرشح غير صحيح`);
    }

    const femaleCandidate = findCandidate(femaleQuota);
    if (femaleCandidate) {
      if (femaleCandidate.gender === 'أنثى' && femaleCandidate.electoral_district === 'الدائرة الثالثة') {
        femaleCheck = true;
      } else {
        return res.status(400).json(`يجب أن تكون المرشحة بالرقم الوطني ${femaleCandidate.national_id} أنثى وتتبع للدائرة الثالثة`);
      }
    } else {
      return res.status(400).json(`الرقم الوطني ${femaleQuota} للمرشحة غير صحيح`);
    }

    const circassiancandidate = findCandidate(circassian);
    if (circassiancandidate) {
      if ((femaleCandidate.religion === 'شركسي'|| femaleCandidate.religion === 'شيشاني') && femaleCandidate.electoral_district === 'الدائرة الثالثة') {
        circassiancheck = true;
      } else {
        return res.status(400).json(`
          يجب أن يكون المرشح  بالرقم الوطني 
          
          ${circassiancandidate.national_id} شركسي أو شيشاني`);
      }
    } else {
      return res.status(400).json(`الرقم الوطني ${circassian} للمرشحة غير صحيح`);
    }


    
    const nameone = await knex.select('*').from('citizens').where('national_id', muslimone);

   
 
    console.log("this is nameone value  and muslimone"+ nameone[0].name +muslimone)

    
    if (muslimCheck && femaleCheck && circassiancheck ) {

      
      const candidate = await knex('citizens')
        .where('national_id', muslimone)
        .select('national_id', 'name')
        .first();

        const checkcandidate = await knex('candidates_local')
.where('national_id', muslimone)
.select('national_id')
.first();

if(!checkcandidate){
      if (candidate) {
        await knex('candidates_local').insert({
         
          national_id: candidate.national_id,
          list_id: listID, // Use listId directly
          district_id:3, // Assuming district_id is 1
          vote_count: 0, // Default vote count
         });
      }
    }else{

      console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimone);
      return res.json(`الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل ${muslimone}`);
    }

      const candidate2 = await knex('citizens')
      .where('national_id', muslimtwo)
      .select('national_id')
      .first();
      const checkcandidate2 = await knex('candidates_local')
      .where('national_id', muslimtwo)
      .select('national_id')
      .first();
      
      if(!checkcandidate2){
    if (candidate2) {
      await knex('candidates_local').insert({
       
        national_id: candidate2.national_id,
        list_id: listID, // Use listId directly
        district_id: 3, // Assuming district_id is 1
        vote_count: 0, // Default vote count
 
      });
    }}else{

      console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimtwo);
      return res.json("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimtwo);
    }



    const candidate3 = await knex('citizens')
    .where('national_id', muslimthree)
    .select('national_id', 'name')
    .first();
    const checkcandidate3 = await knex('candidates_local')
    .where('national_id', muslimthree)
    .select('national_id')
    .first();
    
    if(!checkcandidate3){
  if (candidate3) {
    await knex('candidates_local').insert({
    
      national_id: candidate3.national_id,
      list_id: listID, // Use listId directly
      district_id: 3, // Assuming district_id is 1
      vote_count: 0, // Default vote count
     });
  }}else{

    console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimthree);
    return res.json("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimthree);
  }



  const candidate4 = await knex('citizens')
  .where('national_id', muslimfour)
  .select('national_id', 'name')
  .first();
  const checkcandidate4 = await knex('candidates_local')
  .where('national_id', muslimfour)
  .select('national_id')
  .first();
  
  if(!checkcandidate4){
if (candidate4) {
  await knex('candidates_local').insert({
 
    national_id: candidate4.national_id,
    list_id: listID, // Use listId directly
    district_id: 3, // Assuming district_id is 1
    vote_count: 0, // Default vote count
   });
}}else{
 console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimfour);
  return res.json("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimfour);
 

}


const candidate5 = await knex('citizens')
.where('national_id', circassian)
.select('national_id', 'name')
.first();
const checkcandidate5 = await knex('candidates_local')
.where('national_id', circassian)
.select('national_id')
.first();

if(!checkcandidate5){
if (candidate5) {
await knex('candidates_local').insert({
  
  national_id: candidate5.national_id,
  list_id: listID, // Use listId directly
  district_id: 3, // Assuming district_id is 1
  vote_count: 0, // Default vote count
 });
}}else
{

console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+circassian);
return res.json("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+circassian);

}
const checkcandidate6 = await knex('candidates_local')
.where('national_id', femaleQuota)
.select('national_id')
.first();

const candidate6 = await knex('citizens')
.where('national_id', femaleQuota)
.select('national_id', 'name')
.first();

if(!checkcandidate6){
if (candidate6) {
await knex('candidates_local').insert({
  
  national_id: candidate6.national_id,
  list_id: listID, // Use listId directly
  district_id: 3, // Assuming district_id is 1
  vote_count: 0, // Default vote count
 });
}}else{
console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+femaleQuota)
return res.json("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+femaleQuota)


}



      
   
       return res.json("جميع الشروط صحيحة: المرشح مسلم ويتبع للدائرة الثالثة، والمرشحة أنثى وتتبع للدائرة الثالثة ومرشح شركسي شيشاني ");
    
    }
  } catch (err) {
    console.error("An error occurred:", err);
    
    console.error("Error details:", {
      message: err.message,
      stack: err.stack
    });
    if (!res.headersSent) {
      res.status(500).json("حدث خطأ ما: " + err.message);
    }
  }
};

module.exports = { checkamman3id };
