import React from 'react';
import { BsBook, BsArrowLeft, BsArrowRight, BsSearch, BsX } from 'react-icons/bs';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proverbsData: [],
      chapter: 1,
      mode: 'chapter',
      selectedVerse: null,
      clickedVerse: null,
      clickedProverb: null,
      searchQuery: '',
      searchResults: [],
    };
  }

  componentDidMount() {
    import('./ProverbsDataSet_BSCS2A.json')
      .then(response => response.default)
      .then(data => {
        console.log('Data from JSON file:', data);
        this.setState({ proverbsData: data });
      })
      .catch(error => {
        console.error('Error fetching proverbs data:', error);
        // Handle error accordingly, e.g., display a message to the user
      });
  }

  handleButtonClick(item, mode) {
    if (mode === 'chapter') {
      this.setState({ chapter: item, mode: 'verse', selectedVerse: null, clickedVerse: null, clickedProverb: null });
    } else if (mode === 'verse') {
      this.setState({ selectedVerse: item, clickedVerse: null, clickedProverb: null });
    }
  }

  handleNextButtonClick() {
    if (this.state.mode === 'verse') {
      const nextVerse =
        this.state.selectedVerse < Math.max(...this.state.proverbsData.map(proverb => +proverb.verseNum))
          ? this.state.selectedVerse + 1
          : 1;

      const nextProverb = this.state.proverbsData.find(
        proverb =>
          proverb.chapNum === this.state.chapter.toString() &&
          proverb.verseNum === nextVerse.toString()
      );

      if (nextProverb) {
        this.setState({ selectedVerse: nextVerse, clickedVerse: null, clickedProverb: null });
      } else {
        // Handle the case where the next proverb is not found
        console.error('Next proverb not found!');
      }
    }
  }

  handleVerseNoteClick() {
    this.setState(prevState => {
      const clickedProverb = this.state.proverbsData.find(
        proverb =>
          proverb.chapNum === this.state.chapter.toString() &&
          proverb.verseNum === this.state.selectedVerse.toString()
      );

      return {
        clickedVerse: prevState.clickedVerse === null ? this.state.selectedVerse : null,
        clickedProverb,
      };
    });
  }

  handleReturnButtonClick() {
    this.setState({ mode: 'chapter', selectedVerse: null, clickedVerse: null, clickedProverb: null });
  }

  handleSearch = () => {
    const { searchQuery, proverbsData } = this.state;

    const results = proverbsData.filter(proverb =>
      proverb.keywords.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.setState({ searchResults: results });
  };

  handleRemoveSearchResults = () => {
    this.setState({ searchResults: [], searchQuery: '' });
  };

  render() {
    const chapters = [...Array(31).keys()].map(i => i + 1);
    const verseNumbersForChapter = [
      ...new Set(
        this.state.proverbsData
          .filter(proverb => proverb.chapNum === this.state.chapter.toString())
          .map(proverb => +proverb.verseNum)
      ),
    ];

    const itemsToRender = this.state.mode === 'chapter' ? chapters : verseNumbersForChapter;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search Proverbs"
            value={this.state.searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
            style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
          />
          <button onClick={this.handleSearch} style={{ padding: '5px', fontSize: '16px' }}>
            <BsSearch style={{ marginRight: '5px' }} />
            Search
          </button>
          {this.state.searchResults.length > 0 && (
            <button onClick={this.handleRemoveSearchResults} style={{ marginLeft: '10px', padding: '5px', fontSize: '16px' }}>
              <BsX style={{ marginRight: '5px' }} />
              Remove Search Results
            </button>
          )}
        </div>

        {this.state.searchResults.length > 0 && (
          <div style={{ textAlign: 'center', width: '100%', margin: '0 auto', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {this.state.searchResults.map(result => (
              <div key={result.id} style={{ border: '2px solid #984063', padding: '10px', marginBottom: '10px', marginRight: '10px' }}>
                <p style={{ fontWeight: 'bold' }}>
                  Proverbs {result.chapNum}:{result.verseNum}: {result.text.replace(/�/g, '')} (Keywords: {result.keywords})
                </p>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {itemsToRender.map(item => (
            <button
              key={item}
              onClick={() => this.handleButtonClick(item, this.state.mode)}
              style={{
                fontSize: this.state.mode === 'chapter' ? '24px' : '16px',
                padding: '5px 10px',
                minWidth: '150px',
                margin: '5px',
                backgroundColor: this.state.mode === 'chapter' ? '#41436A' : '#984063',
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
              }}
              className={item === this.state.selectedVerse ? 'selected' : ''}
            >
              {this.state.mode === 'chapter' ? `Proverbs ${item}` : `Verse ${item}`}
            </button>
          ))}
        </div>

        {this.state.selectedVerse !== null && (
          <div>
            {this.state.mode === 'verse' && this.state.clickedVerse !== null && (
              <div
                style={{
                  fontSize: '20px',
                  padding: '10px',
                  margin: '10px',
                  backgroundColor: '#FE9677',
                  color: '#FFFFFF',
                  border: '2px solid #FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <BsBook style={{ fontSize: '30px', marginBottom: '10px' }} />
                <p>
                  Proverbs {this.state.clickedProverb.proverbNum} ({this.state.clickedProverb.chapNum}):
                  {this.state.clickedProverb.verseNum}
                </p>
                <p>
                  {this.state.clickedProverb.text.replace(/�/g, '')}
                </p>
                <button
                  onClick={() => this.handleNextButtonClick()}
                  style={{
                    fontSize: '18px',
                    padding: '5px 10px',
                    margin: '10px',
                    backgroundColor: '#984063',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Next Verse <BsArrowRight style={{ marginLeft: '5px' }} />
                </button>
                <button
                  onClick={() => this.handleReturnButtonClick()}
                  style={{
                    fontSize: '18px',
                    padding: '5px 10px',
                    margin: '10px',
                    backgroundColor: '#984063',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <BsArrowLeft style={{ marginRight: '5px' }} /> Return to Chapters
                </button>
              </div>
            )}
          </div>
        )}

        {this.state.mode === 'verse' && this.state.clickedVerse === null && (
          <>
            {this.state.selectedVerse !== null && (
              <div
                onClick={() => this.handleVerseNoteClick()}
                style={{
                  fontSize: '16px',
                  padding: '5px 10px',
                  margin: '10px',
                  backgroundColor: '#984063',
                  color: '#FFFFFF',
                  border: '2px solid #FFFFFF',
                  cursor: 'pointer',
                }}
              >
                Click to Show Note for Verse {this.state.selectedVerse}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Home;
