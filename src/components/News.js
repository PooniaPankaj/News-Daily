import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [Articles, setArticle] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [page, setpage] = useState(0);
  const [TotalResults, setTotalResults] = useState(0);
  
  const CapitalizeFunction = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // we need to pass the props in the constructor

  
  const updatePage= async()=> {
    
    props.setProgress(20);
    setLoading( true );
    setpage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading( true );
    let data = await fetch(url);
    props.setProgress(40);
    let parseddata = await data.json();
    props.setProgress(60);
    setArticle(parseddata.articles);
    setTotalResults(parseddata.totalResults);
    setLoading(false);
    props.setProgress(100);

  }
  useEffect(() => {
    updatePage();
    document.title = `NewsDaily-${CapitalizeFunction(props.category)}`;
  },[])
  
  
  const handleprevclick = async () => {
    setpage(page-1);
    // this.setState({
    //   page: this.state.page - 1,
    //   curr_page: this.state.curr_page - props.pageSize
    // })
    updatePage();
    setLoading(false);
    
  }
  const handlenextclick = async () => {
    setpage(page+1);
    // this.setState({
    //   page: this.state.page + 1,
    //   curr_page: this.state.curr_page + props.pageSize
    // })
    updatePage(); 
    setLoading(false);
  }


  // adding infinte scroll element fetch function
  const fetchMoreData = async () => {

     setTimeout( async() => {
          
          const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pageSize}`;
          setpage(page+1);
          let data = await fetch(url);
          let parseddata = await data.json();
          setArticle(Articles.concat(parseddata.articles));
          setLoading(false);
         
      }, 1000);
      
    

    
  };

    return (
      <>
        <h1 className='text-center my-4 pt-5'>News-Daily Top   {CapitalizeFunction(props.category)} HeadLines </h1>
        
          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll
            dataLength={Articles.length}
            next={fetchMoreData}
            hasMore={Articles.length !== TotalResults}
            
            loader={<Spinner/>}
          >
            <div className="container">
            <div className='row my-4 '>

              {Articles.map((element) => {
                return <div className='col-md-4 h-100 ' key={element.url}>
                  <NewsItem key={element.url} title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}

            </div>
            </div>
          </InfiniteScroll>
          {/* <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}> &larr; Prev </button>
            <button disabled={this.state.curr_page >= this.state.last_page} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
          </div> */}

      </>
    )
  
}
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general"

}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,

}

export default News


