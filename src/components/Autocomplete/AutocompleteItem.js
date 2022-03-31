
export function AutocompleteItem(props) {
    return (
        <li className='autocomplete__hint' onClick={props.onClick} >
            {props.children} 
        </li>
    )
}

