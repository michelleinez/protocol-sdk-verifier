class AuthService {
    private authToken?: string;

    static init(): AuthService {
        return new AuthService();
    }

    setToken(token: string): void {
        this.authToken = token;
        this.setToken = (token: string) => {};
    }

    getToken(): string {
        return this.authToken || "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJrTXpRVEEyUkRrMVJqSTBOVEUyTlVZNU1rTkJRekF6TWtGRU4wSTROalk1T0RreVFqVkJNZyJ9.eyJpc3MiOiJodHRwczovL2tpdmEtcHJvdG9jb2wuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVmYzkzODA3OWFkY2U3MDA2YWFiYTk3NSIsImF1ZCI6WyJodHRwczovL2tpdmEtcHJvdG9jb2wuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2tpdmEtcHJvdG9jb2wuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxNzMxMjUzMywiZXhwIjoxNjE3Mzk4OTMzLCJhenAiOiI3TkhwVHl5SDZ5UlBQdTZ2T0NFZE5SU213T1BGS2tsRCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgYWRkcmVzcyBwaG9uZSByZWFkOmN1cnJlbnRfdXNlciB1cGRhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGRlbGV0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgY3JlYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX2RldmljZV9jcmVkZW50aWFscyBkZWxldGU6Y3VycmVudF91c2VyX2RldmljZV9jcmVkZW50aWFscyB1cGRhdGU6Y3VycmVudF91c2VyX2lkZW50aXRpZXMiLCJndHkiOiJwYXNzd29yZCJ9.jIdF5Gm18XbRCE16gCAEtjyuFrxe1Aa3IV3GsUm5RQslmHwj1fSp_L0SFhdxMoB4M4suLmKtGSi3LoDKuNEV-5HF-wmZEtRFynSoQBJzG29K4Z95awXtC72bmo2UG0qcI6sj-GmwqUfUEuSqtQnEqJqa0JrL14WY_QWtOrZKGpgQ9TJIWM2I5L66TulHKlYqfsnS1r9lGKb9GpkB2otPBuv0sLw5UcQ9POc5zA8xGp_ZnQjnfuGrBgU9VKIIXdCmoxxkDDmHYK-vvF_0k5fQiQ8JJ7l8vJPghFGz7_TPz5ESQ5fOGMv2gw0ucVok9NMk5rW6qB6VR0mFPPKZliN3Mw";
    }
}

const auth: AuthService = AuthService.init();

export default auth;
