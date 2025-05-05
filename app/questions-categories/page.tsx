import AppNavbar from "../components/AppNavbar";
import { Box } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function CategoriesPage(){

    //aici eventual sa fie incarcate categoriile din backend ??
    //de adaugat si iconite maybe
    const categories = [{title: "Programming"}, {title: "Cooking"}, {title: "Cleaning"}, {title: "Mathematics"},
    {title: "Medicine"}, {title: "Cars"}];

    const testItemsListQuestions = [{title: "Q1", description: "desc1"},
        {title:"Q2", description: "desc2"},
        {title:"Q3", description: "desc3"},
        {title: "Q4", description: "desc4"}
    ];
    return(<div style={{height: '100vh', overflow:'hidden'}}>
        <AppNavbar></AppNavbar>
        <Box sx={{display: 'flex', paddingTop: '3vh', height: '100vh'}}>
            <List sx={{backgroundColor: '#6cb0f5', width: '15vw', overflowY: 'auto'}}>
                {categories.map((item, index) => (
                    <ListItem key={index} sx={{paddingLeft: '3vw', 
                    marginBottom: '1vh', 
                    backgroundColor: '#037ffc',
                    paddingInlineStart: '4vw',
                    borderRadius: '3vw',
                    color: '#e8eaeb'}} >{item.title}</ListItem>))}
            </List>
            <List sx={{width: '85vw', backgroundColor: '#6cb0f5', overflowY: 'auto'}}>
                {testItemsListQuestions.map((item, index) => (
                    <ListItem key={index} sx={{paddingLeft: '3vw', 
                    marginBottom: '1vh', 
                    backgroundColor: '#037ffc',
                    paddingInlineStart: '4vw',
                    borderRadius: '3vw',
                    color: '#e8eaeb'}} >{item.title}</ListItem>))}            </List>
        </Box>
        
    </div>);
}