/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1,
    name: 'Jack',
    phone: 88885555,
    bookingTime: '2024-01-01',
    email: 'jack@email.com',
    destination: 'New York',
    seatNumber: '1',
    ticketType: 'Business'
  },
  {
    id: 2,
    name: 'Rose',
    phone: 88884444,
    bookingTime: '2024-02-01',
    email: 'rose@email.com',
    destination: 'Paris',
    seatNumber: '2',
    ticketType: 'Economy'
  }
];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { id, name, phone, bookingTime, email, destination, seatNumber, ticketType } = props.traveller;
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{bookingTime}</td>
      <td>{email}</td>
      <td>{destination}</td>
      <td>{seatNumber}</td>
      <td>{ticketType}</td>
    </tr>
  );
}

function Display(props) {
  
  /*Q3. Write code to render rows of table, each corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Email</th>
          <th>Destination</th>
          <th>Seat Number</th>
          <th>Ticket Type</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(traveller => <TravellerRow key={traveller.id} traveller={traveller} />)}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    
    const form = e.target;
    const newTraveller = {
      id: form.id.value, 
      name: form.travellername.value, 
      phone: form.phone.value, 
      email: form.email.value, 
      destination: form.destination.value, 
      bookingTime: form.bookingTime.value,
      seatNumber: form.seatNumber.value,
      ticketType: form.ticketType.value, 
    };

    this.props.bookTraveller(newTraveller);
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required />
        <input type="text" name="phone" placeholder="Phone" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="text" name="destination" placeholder="Destination" required />
        <input type="date" name="bookingTime" required />
        <input type="number" name="seatNumber" placeholder="Seat Number" required />
        <select name="ticketType" required>
          <option value="">Select Ticket Type</option>
          <option value="First Class">First Class</option>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
        </select>
        <button type="submit">Add Traveller</button>
      </form>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = e.target;
    const travellerId = form.travellerId.value;

    const idToDelete = parseInt(travellerId, 10);

    this.props.deleteTraveller(idToDelete);
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="number" name="travellerId" placeholder="Traveller ID" required />
        <button type="submit">Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  render() {
    const seatStyle = {
      width: '30px',
      height: '30px',
      margin: '5px',
      backgroundColor: 'orange', // Default color for unreserved seats
    };

    const reservedSeatStyle = {
      ...seatStyle,
      backgroundColor: 'green', // Color for reserved seats
    };

    return (
      <div>
        <h2>Welcome to Ticket To Ride!!!</h2>
        <h2>Seat Availability</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {this.props.seats.map((seat) => (
            <div key={seat.id} style={seat.isReserved ? reservedSeatStyle : seatStyle} />
          ))}
        </div>
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { 
      travellers: [], 
      selector: 1,
      seats: Array(10).fill().map((_, index) => ({ id: index, isReserved: false }))
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value) {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.travellers !== this.state.travellers) {
      localStorage.setItem('travellers', JSON.stringify(this.state.travellers));
    }
  }

  componentDidMount() {
    const savedTravellers = localStorage.getItem('travellers');
    if (savedTravellers) {
      this.setState({ travellers: JSON.parse(savedTravellers) });
    } else {
      this.loadData();
    }
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(newTraveller) {
    const seatNumber = parseInt(newTraveller.seatNumber, 10);
    
    // Prevent overflow - Ensure that the seat is not already reserved
    if (this.state.seats[seatNumber].isReserved) {
      alert(`Seat ${seatNumber} is already taken.`);
      return;
    }

    if (this.state.travellers.length >= 10) {
      alert("No more seats available.");
      return;
    }

    this.setState(prevState => {
      let maxId = 0;
      prevState.travellers.forEach(t => {
        if (t.id > maxId) maxId = t.id;
      });
      const newId = maxId + 1;

      alert(`Traveller ${newTraveller.name} added successfully with ID ${newId}.`);

      return {
        travellers: [...prevState.travellers, { ...newTraveller, id: newId }],
        seats: prevState.seats.map(seat =>
          seat.id === seatNumber ? { ...seat, isReserved: true } : seat
        )
      };
    });
  }

  deleteTraveller(passengerId) {
    const travellerToDelete = this.state.travellers.find(traveller => traveller.id === passengerId);

    if (!travellerToDelete) {
      alert(`Traveller with ID ${passengerId} not found.`);
      return;
    }

    this.setState(prevState => {
      const updatedTravellers = prevState.travellers.filter(traveller => traveller.id !== passengerId);

      alert(`Traveller with ID ${passengerId} deleted successfully.`);

      return {
        travellers: updatedTravellers,
        seats: prevState.seats.map(seat =>
          seat.id === parseInt(travellerToDelete.seatNumber, 10) ? { ...seat, isReserved: false } : seat
        )
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <button onClick={() => this.setSelector(1)}>Home</button>
          <button onClick={() => this.setSelector(2)}>Display Travellers</button>
          <button onClick={() => this.setSelector(3)}>Add Traveller</button>
          <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
        </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector === 1 && <Homepage seats={this.state.seats} />}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById('contents'));