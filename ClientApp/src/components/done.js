import React from 'react';
import { Button } from 'reactstrap';
import { AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';




export default class Done extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <p>{this.props.task.taskName}</p>
                        <Button color="danger" onClick={() => this.props.delete(this.props.task.taskId)}>Delete</Button>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p> {this.props.task.taskDescription} </p>
                </AccordionItemPanel>
            </AccordionItem>
        )
    }
}