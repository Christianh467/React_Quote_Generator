import '../css/App.css';
import React, { Component } from 'react';

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

/*REACT*/
class QuoteGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        fetchedQuotes: [],         //Quotes fetched from API
        currentIndex: 0,          
        currentQuote: '',           
        currentAuthor: ''
      }
    this.generateRandomIndex = this.generateRandomIndex.bind(this);   //bind this. to App
    }

    componentDidMount(){                        //Retrieve quote library from API then generateRandomIndex()
      fetch(API).then(result => result.json())  //Converts API json string info into json
          .then(res => {                        //Retrieve array of quote objects from API
            this.setState({            //Set gatheredQuotes to fetched array
                fetchedQuotes: res.quotes
            }, () => this.generateRandomIndex())
          })
    }
  
    generateRandomIndex(){       //If we have fetchedQuotes, generate random # and use it as index for quote array
      if(this.state.fetchedQuotes.length > 0){
        const randomIndex = Math.floor(Math.random() * this.state.fetchedQuotes.length); //Generate number

        this.setState(state => ({ //Find random quote object in fetchedQuotes array and pull the quote/author props from quote object
          currentIndex: randomIndex,
          currentQuote: state.fetchedQuotes[randomIndex].quote,
          currentAuthor: state.fetchedQuotes[randomIndex].author
      }))
      }
      else{
        console.log('there has been an error with recovering quotes from api')
      }
    }

  render(){
    const currentQuote = this.state.currentQuote;
    const currentAuthor = this.state.currentAuthor;
    const currentIndex = this.state.currentIndex;
    const twitterLink =  `https://twitter.com/intent/tweet?text=${currentQuote}   -${currentAuthor}`;

  return (
    <div className="App">
      <div id='quote-box' className='card col-sm-6'>
        <div className='card-header h2 text-black'>
          INSPIRATIONAL QUOTE GENERATOR
        </div>
        <div className='card-body mt-2 mb-4 mx-3 text-black'>
            <p id='text' className='card-text'>{currentQuote}</p>
            {currentAuthor && <p id='author' className='card-text'>- {currentAuthor}</p>}
            {currentIndex && <p id='indexCounter' className='card-text text-center'>quote number #{currentIndex}</p>}
        </div>
        <div className='card-footer bg-white d-flex justify-content-between'>
            <a id='tweet-quote' target='_blank' href={twitterLink} className='btn btn-primary mx-5'>Tweet</a>
            <button id='new-quote' className='btn btn-primary' onClick={this.generateRandomIndex}>
              Generate A New Quote!
            </button>
        </div>
      </div>
    </div>
  );
  }
}

export default QuoteGenerator;
