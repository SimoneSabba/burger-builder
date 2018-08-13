import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-order';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    getConfig(elementType, htmlType, placeholder, value, isRequired) {
        return {
            elementType: elementType,
            elementConfig: {
                type: htmlType,
                placeholder: placeholder
            },
            value: value,
            validation: {
                required: isRequired
            },
            valid: false,
            touched: false
        }
    }

    state = {
        orderForm: {
            name: this.getConfig('input', 'text', 'Your name', '', true),
            street: this.getConfig('input', 'text', 'Street', '', true),
            city: this.getConfig('input', 'text', 'City', '', true),
            email: this.getConfig('input', 'email', 'Your email', '', true),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', label: 'Fastest' },
                        { value: 'cheapest', label: 'Cheapest' },
                        { value: 'drone', label: 'Drone' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElemId in this.state.orderForm) {
            formData[formElemId] = this.state.orderForm[formElemId].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        this.props.onOrderBurger(order);

    }

    checkValidation (value, rules) {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {

        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputId] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;

        let formIsValid = true;
        for (let inputId in updatedFormElement) {
            formIsValid = updatedFormElement[inputId] && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))
                }
                <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));