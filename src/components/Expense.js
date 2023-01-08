import { add } from '../store/actions/appActions';

class Expense extends Component {
    state = {  }
    render() {
        return (
            
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    transaction: state.transactions
});

const mapDispatchToProps = {
    addTransaction
};
export default connect(mapStateToProps,{} )(Expense);