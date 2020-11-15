import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';

export default class PolicyScreen extends Component {
  constructor(props) {
    super(props);
    let comeFrom = '';
    if (props.route.params && props.route.params.comeFrom) {
      comeFrom = props.route.params.comeFrom;
    }
    this.state = {
      comeFrom: comeFrom,
    };
  }

  clickAccept() {
    if (this.state.comeFrom == '') {
      return this.props.navigation.navigate('MapScreen');
    }
    this.props.navigation.goBack();
  }

  render() {
    return (
      <>
        <ScrollView
          style={styles.container}
          ref={(ref) => {
            this.scrollView = ref;
          }}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text style={styles.titleStyle}>POLITICA DE PRIVACIDADE</Text>
              <Text style={styles.textStyle}>
                A política de privacidade praticada pela JOBCONVO indica ao
                usuário como as suas informações pessoais e/ou profissionais
                fornecidas neste site são utilizadas e armazenadas, bem como
                esclarece a política de proteção de dados de caráter pessoal
                e/ou profissional para que os usuários determinem livre e
                voluntariamente se desejam fornecer seus dados pessoais e/ou
                profissionais requeridos na contratação, alteração de
                informações, ou cancelamento dos serviços.
              </Text>
              <Text style={styles.textStyle}>
                O registro e a utilização eletrônica dos dados do usuário pela
                JOBCONVO, além de estabelecer o vínculo contratual entre as
                partes, têm como finalidade a prestação, ampliação e
                melhoramento dos serviços aos usuários, bem como o envio de
                atualizações dos serviços, o envio, por meios tradicionais e/ou
                eletrônicos, de informações técnicas, operacionais e comerciais
                relativas a produtos e serviços oferecidos neste website, ou a
                serem criados no futuro.
              </Text>
              <Text style={styles.textStyle}>
                Ao atualizar e expandir os serviços deste site, a JOBCONVO
                reserva-se o direito de modificar a presente política para
                adaptá-la a alterações legislativas ou jurisprudenciais, ou
                aquelas relativas às práticas comerciais. Em qualquer caso, a
                JOBCONVO consignará, por meio desta página, as mudanças
                introduzidas com uma antecedência de 15 (quinze) dias à sua
                colocação em prática, pelo que solicita que os usuários a
                visitem periodicamente.
              </Text>
              <Text style={styles.titleStyle}>PROTEÇÃO DAS INFORMAÇÕES</Text>
              <Text style={styles.textStyle}>
                Geralmente você pode visitar o site, sem revelar qualquer
                informação pessoalmente identificável sobre você. Nós não
                coletamos informações pessoais dos visitantes de nosso Site, sem
                que o visitante do site nos forneça esta informação, conforme
                estabelecido nesta Política de Privacidade. Se você pedir para
                receber informações sobre a JOBCONVO, ou quaisquer serviços ou
                produtos do site, você será solicitado a preencher o formulário
                de solicitação on-line que pergunta seu nome, cargo, endereço de
                e-mail, nome da empresa, número de telefone, país.
              </Text>
              <Text style={styles.textStyle}>
                A JOBCONVO se compromete a não vender, alugar ou divulgar as
                informações pessoais de seus usuários, exceto na hipótese de
                solicitação oficial de qualquer Autoridade Pública, devidamente
                fundamentada, independente de notificação prévia.
                Ocasionalmente, a JOBCONVO se vale de outras empresas ou agentes
                para praticar os serviços oferecidos neste site, como por
                exemplo, um regime de parceria mantido com operadoras de cartões
                de créditos e instituição bancárias para permitir o pagamento
                nas transações. Por essas razões, essas empresas podem ter
                contato com dados pessoais dos usuários deste site. Por
                disposições contratuais, essas empresas seguem a presente
                Política de Privacidade.
              </Text>
              <Text style={styles.textStyle}>
                Ao utilizar suas informações de identificação no site, a
                JOBCONVO pode verificar a sua autoridade para entrar no site e
                acessar os serviços, notificá-lo sobre atualizações, melhorar o
                conteúdo e administração geral do site e dos serviços;
                fornecer-lhe informações sobre os serviços e outros serviços que
                você adquiriu ou poderá adquirir no futuro, e para enviar
                publicidade que você. Quando você envia mensagens através do
                site, o seu nome e e-mail serão identificados na mensagem e o
                destinatário poderá ver o seu nome e o seu e-mail.
              </Text>
              <Text style={styles.titleStyle}>COOKIES</Text>
              <Text style={styles.textStyle}>
                JOBCONVO pode utilizar “cookies” quando um usuário tem acesso ao
                site. Os “cookies” que podem ser utilizados no site associam-se
                unicamente com o navegador de um determinado computador, não
                proporcionando referências que permitam deduzir o nome e
                sobrenomes do usuário. Em razão dos “cookies”, é possível que
                JOBCONVO reconheça os usuários que tenham se registrado em uma
                utilização anterior do site, o que permite que não tenham que se
                registrar a cada nova visita. O usuário tem a possibilidade de
                configurar seu navegador para ser avisado, na tela do
                computador, sobre a recepção dos “cookies” e para impedir a sua
                instalação no disco rígido.
              </Text>
              <Text style={styles.textStyle}>
                As informações pertinentes a esta configuração estão disponíveis
                em instruções e manuais do próprio navegador. Para utilizar o
                site, não é necessário que o usuário permita a recepção de
                “cookies” enviados por JOBCONVO no site em que não há
                necessidade de inserir e-mail e senha. Os “cookies” que são
                utilizados nos sites e páginas web do site podem ser instalados
                por JOBCONVO, os quais são originados dos distintos servidores
                operados por esta, ou a partir dos servidores de terceiros que
                prestam serviços e instalam “cookies” por JOBCONVO (como, por
                exemplo, os cookies que são empregados para prover serviços de
                publicidade ou certos conteúdos através dos quais o usuário
                visualiza a publicidade ou conteúdos em tempo, número de vezes e
                forma pré-determinados). Sempre que a opção que impeça a
                instalação dos “cookies” não tenha sido ativada, o usuário
                poderá pesquisar o disco rígido de seu computador conforme as
                instruções do próprio navegador.
              </Text>
              <Text style={styles.titleStyle}>
                ALTERAÇÕES A ESTA POLÍTICA DE PRIVACIDADE
              </Text>
              <Text style={styles.textStyle}>
                Quaisquer alterações a esta Política de Privacidade serão
                publicadas no site e a data em que entrará em vigor aparecerá no
                topo da página.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.fabMenuStyle}>
          <Button
            color="#ffffff"
            title="Concordo"
            onPress={() => this.clickAccept()}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  SectionStyle: {
    flex: 4,
    marginTop: 0,
  },
  titleStyle: {
    color: 'black',
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'left',
    alignSelf: 'stretch',
    fontSize: 18,
  },
  textStyle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  fabMenuStyle: {
    flexDirection: 'row',
    flex: 0.05,
    padding: 10,
    backgroundColor: '#6948F4',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
