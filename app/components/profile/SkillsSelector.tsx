"use client";

import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";

interface Props{
    selectedSkills: string[],
    allSkills: string[],
    onChange: (skills: string[])=>void;
}

export default function SkillsSelector({selectedSkills, allSkills, onChange}:Props){
    const handleChange = (event:any)=>{
        const value = event.target.value;
        onChange(typeof value==='string' ? value.split(',') : value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="skills-label">Skills</InputLabel>
            <Select 
                labelId="skills-label" 
                multiple 
                value={selectedSkills} 
                onChange={handleChange}
                input={<OutlinedInput label="Skills"/>}
                renderValue={(selected)=>selected.join(', ')}
            >
                {allSkills.map((skill)=>(
                    <MenuItem key={skill} value={skill}>
                        <Checkbox checked={selectedSkills.includes(skill)}/>
                        <ListItemText primary={skill}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};