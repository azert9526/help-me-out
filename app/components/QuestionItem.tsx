import { Box, Typography } from "@mui/material";
import {Question} from "../../domain/question"


type Props<ID> = {
    question: Question<ID>;
};


export default function QuestionItem<ID>({ question }: Props<ID>) {
    return (
      <Box sx={{backgroundColor: 'transparent', borderRadius: '8px', width: '100vw' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {question.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#b0bec5' }}>
          {question.description}
        </Typography>
        <Typography variant="caption" sx={{ color: '#b0bec5' }}>
          Posted on: {new Date(question.createdDate).toLocaleDateString()} | Answers: {question.answerCount}
        </Typography>
      </Box>
    );
  }