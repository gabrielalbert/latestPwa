import React, { useEffect,useRef,useState } from 'react';
import config from '../config'; // Adjust the path as necessary
import '../App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MainDashboard({active}) {
    //const backgroundImage= 'url(/dashboard4.jpg)'
	const [listing, setListing] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try{
				const response =await  fetch(`${config.apiBaseUrl}promptengineering/dashboard`, {
					method: 'GET',
					headers: { "Content-Type": "application/json"}        
				  });
			  
			  const result = await response.json();
			  console.log('Input fetching data:', result);
			  const zeroShot=JSON.stringify(result.zeroShot);
			  const oneShot=JSON.stringify(result.oneShot);
			  const iterativeShot=JSON.stringify(result.iterativeShot);
			  
			  const data={
				zeroShot,
				oneShot,
				iterativeShot
			  };	
			  setListing([...listing, data]); 

			}
			catch(e){				
			  const zeroShot='0';
			  const oneShot='0';
			  const iterativeShot='0';
			  
			  const data={
				zeroShot,
				oneShot,
				iterativeShot
			  };	
			  setListing([...listing, data]); 
				console.log('Error:', e);
			}

		   
		};
	
		fetchData();
	  }, []);
	  
  return (	
        <div className="p-4" style={styles.image}>
			    <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
            <div className="row">
			{listing.map((item) => (
				<div className="col-md-12">					

				<ul className="intro-stats margin-top-45 hide-under-992px">
					<li>
						<strong className="counter">{item.zeroShot.replace(/"/g, '')}</strong>
						<span>Zero Shot Responses</span>
					</li>
					<li>
						<strong className="counter">{item.oneShot.replace(/"/g, '')}</strong>
						<span>One Shot Responses</span>
					</li>
					<li>
						<strong className="counter">{item.iterativeShot.replace(/"/g, '')}</strong>
						<span>Iterative Shot Responses</span>
					</li>
					
				</ul>
			</div>       
      ))}
		</div>
	    </div>    
  )
}
const styles = {
	image: {
		backgroundImage: 'url(/dashboard.jpg)',
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat"
	},
  };
export default MainDashboard