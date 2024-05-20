import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
} from '@mui/material';
import DefaultLayout from '../layout/DefaultLayout';

interface ExtraInfoProps {
  title: string;
  description: string;
  points: string[];
}

const ExtraInfoTab: React.FC<ExtraInfoProps> = ({
  title,
  description,
  points,
}) => {
  return (
    <Container>
      <Box
        padding={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          {description}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Key Points:
        </Typography>
        <List>
          {points.map((point, index) => (
            <ListItem key={index}>
              <Typography variant="body2">{point}</Typography>
            </ListItem>
          ))}
        </List>
        <Box marginTop={2}>
          <Button
            href="https://mujalumni.in/"
            target="_blank"
            variant="contained"
            color="primary"
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

// Example usage of ExtraInfo component
const ExtraInfo: React.FC = () => {
  const title = 'MUJ Alumni Portal';
  const description =
    'Join the MUJ Alumni Portal to reconnect with old friends, network with professionals, and stay updated with the latest news and events.';
  const points = [
    'Reunite with classmates and friends',
    'Access exclusive alumni events and webinars',
    'Expand your professional network',
    'Stay informed about university news and updates',
    'Participate in alumni mentorship programs',
  ];

  return (
    <DefaultLayout>
      <ExtraInfoTab title={title} description={description} points={points} />
    </DefaultLayout>
  );
};

export default ExtraInfo;
