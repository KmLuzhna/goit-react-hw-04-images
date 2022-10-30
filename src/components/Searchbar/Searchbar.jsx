import PropTypes from 'prop-types'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { SearchButton, SearchForm, SearchInput } from './Searchbar.stylled'

export function Searchbar({ onSubmit }) {
    const [searchText, setSearchText] = useState('')

    const onInputChange = (e) => {
        setSearchText(e.target.value)
    }
    return (
            <header>
                <SearchForm  onSubmit={onSubmit}>
                <SearchButton type="submit">
                    <BsSearch size="20" />
                </SearchButton>

                    <SearchInput 
                        onChange={onInputChange}
                        name='searchInput'
                        type="text"
                        autoComplete="off"
                        value={searchText}
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </header>
        )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}