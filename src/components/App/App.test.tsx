import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


describe('App component', () => {
    afterEach(cleanup);

    it('найти заголовок', () => {
        render(<App />);
        expect(screen.getByText(/ToDo APP/i)).toBeInTheDocument();
    })


    it('use effect test', async() => {
        render(<App />);
        const x = await screen.findByText(/0/i)
        expect(x).toBeInTheDocument();
    })


 it('Проверка, что при вводе текста в инпут значение равно инпуту', () => {
        render(<App />);
        // const input = screen.getByPlaceholderText(/добавить задачу/i);
        const input = screen.getByTestId('input');
        expect(input).toContainHTML('');
        fireEvent.input(input, {
            target: {value: 'дело'}
        });
        expect(input).toContainHTML('дело');
        // expect(input).toMatch(/^(?! )/);
    })



    it('add list', () => {
        render(<App />);
        const btn = screen.getByTestId('add');
        expect(screen.getByTestId('list-placeholder')).toBeInTheDocument();
        expect(screen.queryByRole('listitem')).toBeNull();
        fireEvent.click(btn);
        // expect(screen.getByTestId('item-testid')).toBeInTheDocument();
        // expect(screen.getByRole('item')).toBeInTheDocument();
    })

})
