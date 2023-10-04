import styled from 'styled-components';

export const Container = styled.div `
    background-image: url('https://kec.edu.np/wp-content/uploads/2016/04/Kec_Panorama1.jpg');
    background-size: cover;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    >form {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 50vh;
        width: 30vw;
        background-color: rgba(205, 216, 216, 0.336);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8.5px);
        border-radius: 10px;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.4rem;


    >div {
    display: flex;
        flex-direction: row;

        >img {
            object-fit: cover;
            border: none;
            border-radius: 50%;
            margin: 5px 0px 0px 10px;

            &:hover {
                box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
            }

        }

        > h1 {
            margin: 30px;
        }
    }

    >div {
    display: flex;
        flex-direction: row;
        align-items: center;

        >input {
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border-radius: 20px;
            width: 120%;
            height: 28px; 
            padding: 10px;
            border: none;
            outline: none;
            color: black;
            font-weight: bold;
            font-size: 20px;
            text-align: center;
            margin: 10px 0px;

            &:focus {
                display: inline-block;
                box-shadow: 0 0 0 0.2rem black;
                border-radius: 20px;
            }

            &:placeholder {
                color: rgb(127, 135, 143);
            }

        }
    }

    >input {
                width: 1.3em;
                height: 1.3em;
                background-color: white;
                border-radius: 10px;
                vertical-align: middle;
                border: 1px solid #ddd;
                outline: none;
                cursor: pointer;
            }

            &:checked {
                background-color: gray;
                background-color: #66bb6a;
                border-color: #66bb6a;
            }
}
>div{
        padding: 20px 0px;
        width: auto;
        height: auto;
        text-align: center;

}

`;