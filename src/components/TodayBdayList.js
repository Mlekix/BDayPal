import React from "react";

function TodayBdayList({ bdayList }) {
  // Filter birthdays that match today's date
  const today = new Date();
  const todayFormatted = `${today.getMonth() + 1}/${today.getDate()}`;

  const todayBdays = bdayList.filter((bday) => {
    const bdayDate = new Date(bday.date);
    const bdayFormatted = `${bdayDate.getMonth() + 1}/${bdayDate.getDate()}`;
    return bdayFormatted === todayFormatted;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Today's Birthdays</h2>
      {todayBdays.length > 0 ? (
        <ul>
          {todayBdays.map((bday) => (
            <li key={bday.id} className="mb-4">
              <h3>{bday.name}</h3>
              {bday.hasParty && (
                <div>
                  <p>Party Date: {bday.partyWhen}</p>
                  <p>Party Location: {bday.partyWhere}</p>
                  <p>Birthday Gift: {bday.gift}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No birthdays today.</p>
      )}
    </div>
  );
}

export default TodayBdayList;
