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
    ticketType: 'First Class'
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
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
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
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Add</button>
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
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}



class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        seats: Array(10).fill().map((_, index) => ({ id: index, isReserved: false })),
      };
    }
  
    componentDidMount() {
      const travellersData = [
        { seatNumber: 0 },
        { seatNumber: 1 },
        { seatNumber: 2 },
        { seatNumber: 3 },
      ];
  
      const reservedSeatNumbers = travellersData.map(traveller => traveller.seatNumber);
  
      const updatedSeats = this.state.seats.map(seat => ({
        ...seat,
        isReserved: reservedSeatNumbers.includes(seat.id)
      }));
  
      this.setState({ seats: updatedSeats });
    }
  
  
    render(){
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
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        <h2>Welcome to Ticket To Ride!!!</h2>
        <h2>Seat Availability</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {this.state.seats.map((seat) => (
              <div key={seat.id} style={seat.isReserved ? reservedSeatStyle : seatStyle} />
            ))}
        </div>
      </div>);
    }
  }
  
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
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
      this.setState({ travellers: JSON.parse(savedTravellers) });}
    else {
      this.loadData();}
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(newTraveller) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
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
		{/*Q3. Code to call component that Displays Travellers.*/}
		
		{/*Q4. Code to call the component that adds a traveller.*/}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));