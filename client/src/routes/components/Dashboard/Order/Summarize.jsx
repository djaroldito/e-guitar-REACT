import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'whitesmoke',
  ...theme.typography.fontWeightBold,
  ...theme.typography.caption,
    padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Summarize = ({data}) => {
    return (
        <div>
      <Stack
        direction="row"
        spacing={2}
            >
                {data?.map(x =>
                        <Item key={x.orderStatus}> {x.orderStatus} <strong>US$ {x.total.toFixed(2)}</strong> </Item>
                    )}
      </Stack>
    </div>

    );
}

export default Summarize;
