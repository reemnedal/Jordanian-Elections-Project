const knex = require('knex')(require('../knexfile').development);

const checkamman1id = async (req, res) => {


  try {
  

    
 

    const { muslimone, muslimtwo, muslimthree, muslimfour, muslimfive, femaleQuota ,listID} = req.body;
    if (!muslimone || !muslimtwo || !muslimthree || !muslimfour || !muslimfive || !femaleQuota) {
      return res.status(400).json("Missing required fields");
    }
    

    const lists = await knex('citizens').select('national_id', 'gender', 'religion', 'electoral_district', 'name');
    console.log("Lists query result:", lists);

    let muslimCheck = false;
    let femaleCheck = false;

    const findCandidate = (id) => lists.find(list => list.national_id === id);

    const candidatesToCheck = [muslimone, muslimtwo, muslimthree, muslimfour, muslimfive];
    let invalidMuslimId = null;

    for (const id of candidatesToCheck) {
      const candidate = findCandidate(id);
      if (candidate) {
        if (candidate.religion === 'مسلم') {
          if (candidate.electoral_district === 'الدائرة الأولى') {
            muslimCheck = true;
          } else {
            return res.status(400).josn(`يجب أن يكون المرشح بالرقم الوطني ${candidate.national_id} يتبع للدائرة الأولى`);
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
      if (femaleCandidate.gender === 'أنثى' && femaleCandidate.electoral_district === 'الدائرة الأولى') {
        femaleCheck = true;
      } else {
        return res.status(400).json(`يجب أن تكون المرشحة بالرقم الوطني ${femaleCandidate.national_id} أنثى وتتبع للدائرة الأولى`);
      }
    } else {
      return res.status(400).json(`الرقم الوطني ${femaleQuota} للمرشحة غير صحيح`);
    }



    
    const nameone = await knex.select('*').from('citizens').where('national_id', muslimone);

   
 
    console.log("this is nameone value  and muslimone"+ nameone[0].name +muslimone)

    
    if (muslimCheck && femaleCheck) {

      
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
          district_id: 1, // Assuming district_id is 1
          vote_count: 0, // Default vote count
         });
      }
    }else{

      console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimone);
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
        district_id: 1, // Assuming district_id is 1
        vote_count: 0, // Default vote count
       });
    }}else{

      console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimtwo);
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
      district_id: 1, // Assuming district_id is 1
      vote_count: 0, // Default vote count
     });
  }}else{

    console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimthree);
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
    district_id: 1, // Assuming district_id is 1
    vote_count: 0, // Default vote count
  });
}}else{

  console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimfour);
}


const candidate5 = await knex('citizens')
.where('national_id', muslimfive)
.select('national_id', 'name')
.first();
const checkcandidate5 = await knex('candidates_local')
.where('national_id', muslimfive)
.select('national_id')
.first();

if(!checkcandidate5){
if (candidate5) {
await knex('candidates_local').insert({
  
  national_id: candidate5.national_id,
  list_id: listID, // Use listId directly
  district_id: 1, // Assuming district_id is 1
  vote_count: 0, // Default vote count
 });
}}else
{

console.log("الرقم الوطني مسجل كمرشح في القوائم المحلية من قبل "+muslimfive);

}

const candidate6 = await knex('citizens')
.where('national_id', femaleQuota)
.select('national_id', 'name')
.first();

if (candidate6) {
await knex('candidates_local').insert({
  
  national_id: candidate6.national_id,
  list_id: listID, // Use listId directly
  district_id: 1, // Assuming district_id is 1
  vote_count: 0, // Default vote count
 });
}



      
   
        res.json("جميع الشروط صحيحة: المرشح مسلم ويتبع للدائرة الأولى، والمرشحة أنثى وتتبع للدائرة الأولى");
    
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

module.exports = { checkamman1id };
