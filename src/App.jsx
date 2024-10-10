/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555,
    bookingTime: '2024-01-01',
    destination: 'Bangkok',
    email: 'jack@email.com',
    seatNumber: 'A12',
    ticketPrice: 120.50
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444,
    bookingTime: '2024-01-01',
    destination: 'Phuket',
    email: 'jack@email.com',
    seatNumber: 'B6',
    ticketPrice: 150.00
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { id, name, phone, bookingTime, destination, email, seatNumber, ticketPrice} = props.traveller;
  return (
    <tr>
    {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    <td>{id}</td>
    <td>{name}</td>
    <td>{phone}</td>
    <td>{bookingTime}</td>
    <td>{destination}</td>
    <td>{email}</td>
    <td>{seatNumber}</td>
    <td>{ticketPrice}</td>
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
          <th>{destination}</th>
          <th>{email}</th>
          <th>{seatNumber}</th>
          <th>{ticketPrice}</th>
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
    this.state = { name: '', phone: '' };
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
      bookingTime: form.bookingTime.value, 
      destination: form.destination.value,
      email: form.email.value, 
      seatNumber: form.seatNumber.value,
      ticketPrice: form.ticketPrice.value, 
    };
    this.props.bookTraveller(newTraveller); // Call bookTraveller() from parent component
  }
    

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
      <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
      <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handleChange}
          required
        />
        <button>Add Traveller</button>
        </form>
          );
        }
      }
      
	  
class Delete extends React.Component {
  constructor() {
    super();
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.deleteTraveller(this.state.name); // Call deleteTraveller from parent component
    this.setState({ name: '' }); // Reset the form field
  }
  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Traveller Name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <button>Delete Traveller</button>
      </form>
    );
  }
}


class Homepage extends React.Component {
  render() {
    const totalSeats = 10;
    const bookedSeats = this.props.travellers.length;
    const freeSeats = totalSeats - bookedSeats;

    return (
      <div>
        <h2>Free Seats: {freeSeats} / {totalSeats}</h2>
        <div>
          {[...Array(totalSeats)].map((_, i) => (
            <div
              key={i}
              style={{
                display: 'inline-block',
                width: '30px',
                height: '30px',
                margin: '5px',
                backgroundColor: i < bookedSeats ? 'red' : 'green',
                textAlign: 'center',
                lineHeight: '30px',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
  
  
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    this.setState((prevState) => ({
      travellers: [...prevState.travellers, newTraveller],
    }));
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
  }

  deleteTraveller(passenger) {
    this.setState((prevState) => ({
      travellers: prevState.travellers.filter((traveller) => traveller.name !== name),
    }));
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    console.log("deleteTraverller: ",passenger); 
    //actual deletion
    var newlist =[]
    this.state.travellers.forEacg(element => {
      if(element.name != passenger)
      {
        newlist.push(element);}
    });
  this.setState({travellers:newlist});
}

  render() {
    let component;
    if (this.state.selector === 1) {
      component = <Homepage travellers={this.state.travellers} />;
    } else if (this.state.selector === 2) {
    } else if (this.state.selector === 3) {
      component = <Display travellers={this.state.travellers} />;
    } else if (this.state.selector === 4) {
      component = <Delete deleteTraveller={this.deleteTraveller} />;
    }
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <nav>
          <button onClick={() => this.setSelector(1)}>Home</button>
          <button onClick={() => this.setSelector(2)}>Add Traveller</button>
          <button onClick={() => this.setSelector(3)}>View Travellers</button>
          <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
        </nav>
        {component}
      </div>
    );
  }
}

	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}

	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
		
		{/*Q4. Code to call the component that adds a traveller.*/}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    <Delete deletefunction={this.deleteTraveller}/>
  </div>
  

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
