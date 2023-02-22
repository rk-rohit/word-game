import "./styles.css";
import MatrixDispaly from "./MatrixDisplay";

export default function App() {
  return (
    <div className="App">
      <h1>Word Puzzle</h1>
      <MatrixDispaly matrixSize={6} />
    </div>
  );
}

// scrablle game
// matrix 2 * 2
// user enter key on after other
// first user A
//  [A , N, ]
//  [ ,  , ]
//  [ , ,  ]
