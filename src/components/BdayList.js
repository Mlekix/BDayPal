function BdayList({ bdayList }) {
  return (
    <div>
      <h2 className="mt-4">List of Birthdays</h2>
      <ul>
        {bdayList.map((bday) => (
          <li className="m-3" key={bday.id}>
            <p>Name: {bday.name}</p>
            <p>Date: {bday.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BdayList;
