import React, {useState} from 'react';
import './App.css';
import { 
  Container,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,

 } from 'reactstrap';

import Movie from './components/Movie'

function App() {

  const [moviesCount,setMoviesCount] = useState(0)
  const [moviesWishList, setMoviesWishList] = useState([])

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  var handleClickAddMovie = (name, img) => {
    setMoviesCount(moviesCount+1)
    setMoviesWishList([...moviesWishList, {name:name,img:img}])
  }

  var handleClickDeleteMovie = (name) => {
    setMoviesCount(moviesCount-1)
    setMoviesWishList(moviesWishList.filter(object => object.name != name))
  }

  var cardWish = moviesWishList.map((movie,i) => {
    return (
      <ListGroupItem>
        <ListGroupItemText onClick={() => {handleClickDeleteMovie(movie.name)}}>
        <img width="25%" src={movie.img} /> {movie.name}
        </ListGroupItemText>
      </ListGroupItem>
    )
  })

  var moviesData = [
    {name:"Star Wars: The Rise of Skywalker", desc:"The surviving members of the resistance face the First Order once again, and the legendary...", img:"/starwars.jpg", note:6.7, vote:1},
    {name:"Maleficent", desc: "A vengeful fairy is driven to curse an infant princess, only to discover that...", img:"/maleficent.jpg", note:8.2, vote:6},
    {name:"Jumanji: The Next Level", desc: "In Jumanji: The Next Level, the gang is back but the game has changed. As they return to...", img:"/jumanji.jpg", note:4, vote:10},
    {name:"Once Upon a Time... in Hollywood", desc: "A faded television actor and his stunt double strive to achieve fame...", img:"/once_upon.jpg", note:6, vote:20},
    {name:"Frozen II", desc: "Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land...", img:"/frozen.jpg", note:4.6, vote:17},
    {name:"Terminator: Dark Fate", desc: "An augmented human and Sarah Connor must stop an advanced liquid Terminator from hunting...", img:"/terminator.jpg", note:6.1, vote:3},
    {name:"Bad Boys for Life", desc: "Miami detectives Mike Lowrey and Marcus Burnett must face off against a mother-and-son...", img:"/badboy3.jpg", note:6.6, vote:10},
  ]

  var movieList = moviesData.map((movie,i) => {
    var result = moviesWishList.find(element => element.name == movie.name)
    var isSee = false
    if(result != undefined){
      isSee = true
    }
    return(<Movie key={i} movieSee={isSee} handleClickDeleteMovieParent={handleClickDeleteMovie} handleClickAddMovieParent={handleClickAddMovie} movieName={movie.name} movieDesc={movie.desc} movieImg={movie.img} globalRating={movie.note} globalCountRating={movie.vote} />)
  })

  return (
    <div style={{backgroundColor:"#F6ECF5"}}>
      <Container>
        <Nav>
          <span className="navbar-brand">
            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{color:'black'}}><strong>LAST RELEASES</strong></NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button id="Popover1"  type="button">{moviesCount} movies</Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>WishList</PopoverHeader>
                <PopoverBody>
                <ListGroup>
                {cardWish}
                </ListGroup>
                </PopoverBody>
              </Popover>
            </NavLink>
          </NavItem>
        </Nav>
        <Row>
          {movieList}
        </Row>
      </Container>
    </div>
  );
}

export default App;
