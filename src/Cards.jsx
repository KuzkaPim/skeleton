import { useState, useEffect } from "react";
import styled from "styled-components";
import { Transition, TransitionGroup } from "react-transition-group";
import { Container } from "./Container";
import SkeletonService from "./SkeletonService";

const CardsEl = styled.div`
    
`;

const CardsUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
`;

const Card = styled.li`
    padding: 20px;
    background: #ddd;
    border-radius: 20px;
`;

const SkeletonLi = styled.li`
    padding: 20px;
    background: #ddd;
    border-radius: 20px;
    animation: skeletonFade 1s linear infinite alternate;
    
    div {
        width: 60%;
        height: 20px;
        background: #ccc;
        border-radius: 20px;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    background: #000;
    color: #fff;
    border-radius: 20px;
    margin-top: 30px;
    border: none;
`;

const defaultStyle = {
    transition: `opacity ${500}ms ease-in-out`,
    opacity: 0,
}

const skeletonStyle = {
    opacity: 0,
}
  
const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

const Cards = () => {
    const [ comments, setComments ] = useState([]);
    const [ process, setProcess ] = useState('loading');
    const { getComments } = SkeletonService();
    const [ currentPage, setCurrentPage ] = useState(1);

    const onAdd = () => {
        setProcess('loading');
        getComments(currentPage)
            .then(res => {
                setComments([...comments, ...res]);
                setProcess('confirm');
                setCurrentPage(prev => prev + 1);
            });
    }

    useEffect(() => {
        console.log('use effect');
        onAdd();
    }, []);

    return (
        <CardsEl>
            <Container>
                <TransitionGroup component={CardsUl}>
                    <Content comments={comments} process={process}/>
                    <Skeletons process={process}/>
                </TransitionGroup>
                <Button onClick={onAdd}>Добавить</Button>
            </Container>
        </CardsEl>
    )
}

const Content = ({comments, process}) => {
    return (
        comments.map(item => {
            return (
                <Transition
                    key={item.id}
                    in={process}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                >
                    {
                        state => (
                            <Card style={{...defaultStyle, ...transitionStyles[state]}}>{item.id}. {item.name}</Card>
                        )
                    }
                </Transition>
                
            )
        })
    )
}

const Skeleton = ({process}) => {
    return (
        <Transition
            in={process === 'loading'}
            mountOnEnter
            unmountOnExit
        >
            {state => (
                <SkeletonLi style={{...skeletonStyle, ...transitionStyles[state]}}>
                    <div></div>
                </SkeletonLi>
            )}
        </Transition>
    )
}

const Skeletons = ({process}) => {
    return (
        <>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
            <Skeleton process={process}/>
        </>
    )
}

export default Cards;