exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("elections")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("elections").insert([
          {
            Election_Name: "Local Council Elections 2024",
            Electoral_District: "District 1",
            Electoral_Lists: "List A, List B",
            Start_Date: knex.raw("NOW()"),  // Start date as current time
            End_Date: knex.raw("NOW() + INTERVAL '1 DAY'"),  // End date 5 days from now
            Status: "Ongoing",
            percentage_Voters: 50.00,  // Percentage of voters
            Winning_List: null,  // No winning list yet
            Election_Type: "Local",  // Type of election
          },
          {
            Election_Name: "Party Primaries 2024",
            Electoral_District: "District 2",
            Electoral_Lists: "List X, List Y",
            Start_Date: knex.raw("NOW() + INTERVAL '10 DAY'"),  // Start date 10 days from now
            End_Date: knex.raw("NOW() + INTERVAL '15 DAY'"),  // End date 15 days from now
            Status: "Pending",
            percentage_Voters: 0.00,  // No voters yet
            Winning_List: null,
            Election_Type: "Party",
          },
          {
            Election_Name: "General Elections 2024",
            Electoral_District: "District 3",
            Electoral_Lists: "List 1, List 2, List 3",
            Start_Date: knex.raw("NOW() + INTERVAL '20 DAY'"),  // Start date 20 days from now
            End_Date: knex.raw("NOW() + INTERVAL '30 DAY'"),  // End date 30 days from now
            Status: "Pending",
            percentage_Voters: 0.00,
            Winning_List: null,
            Election_Type: "Local",
          }
        ]);
      });
  };
  