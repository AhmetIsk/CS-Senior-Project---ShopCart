/* eslint-disable import/prefer-default-export */
import { StyleSheet } from "react-native";
import { colors, fontStyles } from '../../../constants/styles';

export const inputIndex = StyleSheet.create({
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 12,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: `${colors.borderColor}`,
        marginTop: 10,
    },
    inputLabel: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'normal',
        color: '#374151',
    },
    buttonContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registrationContainer: {
        margin: 30,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 5,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginBottom: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    header: {
        color: `${colors.orange}`,
        fontFamily: `${fontStyles.Arial}`,
        fontWeight: 'bold',
        fontSize: 50,
        padding: 20,
        paddingBottom: 5,
    },
    enrollHeader: {
        color: `${colors.headerRed}`,
        fontFamily: `${fontStyles.Arial}`,
        fontWeight: 'bold',
        fontSize: 30,
        padding: 20,
    },
    subheader: {
        color: `${colors.gray}`,
        fontWeight: '200',
        paddingBottom: 40,
        fontSize: 20,
    },
    title: {
        width: 197,
        height: 39.9,
        fontSize: 36,
        lineHeight: 36,
        letterSpacing: 0,
        textAlign: 'center',
        color: `${colors.title}`,
        marginBottom: 20,
    },
    subtitle: {
        width: 220,
        height: 46.5,
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'center',
        color: `${colors.subtitle}`,
        marginBottom: 80,
    },
    subcomment: {
        color: `${colors.headerRed}`,
        paddingTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    termsconds: {
        width: 368,
        height: 26.6,
        fontSize: 10,
        letterSpacing: 0,
        textAlign: 'center',
        color: `${colors.termscond}`,
    },
    forgotPass: {
        display: 'flex',
        alignSelf: 'flex-end',
        margin: 15,
        color: `${colors.orange}`,
    },
    square: {
        width: 229,
        height: 135,
        opacity: 0.44,
        backgroundColor: '#fec5aa',
    },
    layout: {
        position: 'absolute',
        left: 1,
        top: 0,
        width: 414,
        height: 896,
    },
    oval: {
        width: 185,
        height: 209,
        opacity: 0.3,
        backgroundColor: '#fec5aa',
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    pick: {
        padding: 10,
        backgroundColor: `${colors.orange}`,
        borderRadius: 12,
        marginVertical: 20
    },
    pickText: {
        fontSize: 16,
        color: `${colors.white}`
    }
});
