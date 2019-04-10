
import map from './map';
import * as mbx from './mobx-dom';
import { MobxElement, render } from './mobx-dom';
import { Store } from './Store';

let store = new Store();

function run() {
  store.run();
}

function add() {
  store.add();
}

function update() {
  store.update();
}

function runLots() {
  store.runLots();
}

function clear() {
  store.clear();
}

function swapRows() {
  store.swapRows();
}

const Row = (
  <tr className={this.props.data.isSelected ? 'danger' : ''}>
    <td className="col-md-1">{this.props.data.id}</td>
    <td className="col-md-4">
      <a onclick={() => { store.select(this.props.data) }}>{this.props.data.label}</a>
    </td>
    <td className="col-md-1"><a onclick={() => store.delete(this.props.data)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
    <td className="col-md-6"></td>
  </tr>
)

const Main = (
  <div className="container">
    <div className="jumbotron">
        <div className="row">
            <div className="col-md-6">
                <h1>React + Mobx</h1>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-sm-6 smallpad">
                        <button type="button" className="btn btn-primary btn-block" id="run" onclick={run}>Create 1,000 rows</button>
                    </div>
                    <div className="col-sm-6 smallpad">
                        <button type="button" className="btn btn-primary btn-block" id="runlots" onclick={runLots}>Create 10,000 rows</button>
                    </div>
                    <div className="col-sm-6 smallpad">
                        <button type="button" className="btn btn-primary btn-block" id="add" onclick={add}>Append 1,000 rows</button>
                    </div>
                    <div className="col-sm-6 smallpad">
                        <button type="button" className="btn btn-primary btn-block" id="update" onclick={update}>Update every 10th row</button>
                    </div>
                    <div className="col-sm-6 smallpad">
                        <button type="button" className="btn btn-primary btn-block" id="clear" onclick={clear}>Clear</button>
                    </div>
                    <div className="col-sm-6 smallpad">
                        <button type="button" className="btn btn-primary btn-block" id="swaprows" onclick={swapRows}>Swap Rows</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <table className="table table-hover table-striped test-data">
      <tbody>
        {map(store.data, (d) => <Row data={d}/>)}
      </tbody>
    </table>
    <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
  </div>
);

render(document.getElementById('main'), <Main />);