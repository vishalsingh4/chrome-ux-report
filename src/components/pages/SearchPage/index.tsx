import { useCallback, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'components/constants';

import SearchCardComponent from 'components/molecules/SearchCardComponent';

type Props = {

};

export const SearchPage: FC<Props> = () => {
    const navigate = useNavigate();

    const handleSubmit = useCallback((url: string) => {
        navigate(ROUTES.REPORT, { state: { url } })
    }, [navigate]);

    return (
        <SearchCardComponent onSubmit={handleSubmit} />
    )
}

export default SearchPage;
