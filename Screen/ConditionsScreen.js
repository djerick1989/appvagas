import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default class ConditionsScreen extends Component {
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
              <Text style={styles.titleStyle}>TERMOS DE SERVIÇO</Text>
              <Text style={styles.textStyle}>
                Leia atentamente os termos de serviço (termos) ao utilizar o
                site web www.jobconvo.com (site), ou quaisquer serviços de Via6
                S/A (JOBCONVO), pois é o contrato que regulará e reconhecerá que
                você concorda em ficar vinculado aos seguintes termos e
                condições (Termos de Serviço). Se você está entrando neste
                acordo em nome de uma empresa ou pessoa jurídica, você declara
                que você tem a autoridade para ligar essa entidade, suas filiais
                e todos os usuários que utilizam os serviços de acesso através
                de sua conta com estes termos e condições, caso em que os termos
                “você” ou “seu” refere-se a essa entidade, suas filiais e
                usuários associados a você. Se você não tiver tal autoridade, ou
                se você não concorda com os termos e condições, você não deve
                aceitar este contrato e não pode usar os serviços.
              </Text>
              <Text style={styles.textStyle}>
                As partes em comum acordo submetem-se ao cumprimento dos deveres
                e obrigações referentes à proteção de dados pessoais disposta na
                legislação brasileira aplicável, LGPD, sobretudo na Lei nº
                12.529, de 30 de novembro de 2011, Lei nº 12.965, de 23 de abril
                de 2014, decreto nº 8.771, de 11 de maio de 2016, e a Lei nº
                13.709, de 14 de agosto de 2018.
              </Text>
              <Text style={styles.titleStyle}>
                Alterações nos Termos de Serviço
              </Text>
              <Text style={styles.textStyle}>
                A JOBCONVO se reserva no direito, de alterar, modificar,
                adicionar ou remover partes destes termos a qualquer momento,
                sem aviso prévio. Você deve verificar periodicamente estes
                termos em relação a mudanças com a utilização do site. Após
                publicar quaisquer alterações a estes termos, você está
                concordando em aceitar essas mudanças.
              </Text>
              <Text style={styles.titleStyle}>Conduta</Text>
              <Text style={styles.textStyle}>
                A violação de quaisquer dos termos abaixo irá resultar no
                cancelamento de sua conta. Enquanto JOBCONVO proíba tais
                condutas, você entende e concorda que a JOBCONVO não pode ser
                responsabilizada pelo conteúdo postado no site e você poderá ser
                exposto a tais materiais. Você concorda em usar o site por sua
                própria conta e risco.
              </Text>
              <Text style={styles.titleStyle}>Consentimento</Text>
              <Text style={styles.textStyle}>
                Você autoriza a JOBCONVO, assim como seus representantes,
                licenciados, fornecedores de serviços e cessionários, para criar
                currículo, fotografias, imagens digitais e gravações de áudio e
                / ou vídeo para transmitir, difundir, reproduzir, usar,
                publicar, exibir e disseminar pela internet sob qualquer forma,
                seu nome, aparência, imagem, voz, fala e apresentação (quer em
                tempo real ou como consagrado nas fotografias, imagens e
                gravações descritas acima) para os fins de que lhe permite
                realizar ou participar de processos de emprego e entrevistas de
                emprego e / ou permitindo que sua conduta, ou participação, na
                preparação ou aconselhamento para entrevistas relacionadas ao
                emprego, e para armazenar, reproduzir, transcrever, exibir,
                editar, em parte ou no todo, o material aqui descrito na
                prossecução de tal finalidades. Ainda, você autoriza a JOBCONVO
                a utilizar tecnologias de inteligência artificial para extração
                de dados de currículos, ranqueamento do currículo de acordo com
                o perfil de vagas onde tenha-se candidatado, eximindo a JOBCONVO
                de qualquer responsabilidade pela opção ou não da continuidade
                de processos seletivos.
              </Text>
              <Text style={styles.textStyle}>
                Você decide liberar e manter a JOBCONVO inofensiva, suas
                afiliadas e seus respectivos membros, gestores, acionistas,
                administradores, diretores, funcionários, prestadores de
                serviços, contratados, designados, licenciados e cessionários de
                todas e quaisquer reivindicações, responsabilidades, processos e
                ação de qualquer modo relacionadas com as atividades acima
                descritas, incluindo, mas não limitado a, qualquer utilização de
                vídeo / áudio gravações e meios digitais. As empresas
                entrevistadoras reconhecem e concordam que as entrevistas
                gravadas serão utilizadas de forma legítima, tanto internamente
                quanto fora da organização JOBCONVO, e não têm intenção de
                causar qualquer dano ou constrangimento indevido para as partes
                envolvidas.
              </Text>
              <Text style={styles.titleStyle}>Conta</Text>
              <Text style={styles.textStyle}>
                Para registrar uma conta na JOBCONVO é necessário o fornecimento
                de dados confidenciais e legais tais como nome, e-mail válido,
                CPF, telefone válido e senha. É necessário ser humano e, para
                menores aprendizes, maior de 14 anos, para outros cargos, maior
                de 18 anos. Não são permitidas contas criadas por qualquer
                pessoa sem antes o consentimento da equipe da JOBCONVO. Contas
                criadas por “robôs” não são permitidas. Sua conta somente é
                ativada após clicar positivamente na aceitação destes termos.
                Sua conta é pessoal e não pode ser compartilhada com outros
                usuários.
              </Text>
              <Text style={styles.textStyle}>
                Se sua conta é uma conta corporativa, você pode criar contas de
                usuários individuais com acesso pessoal. No entanto, você será o
                responsável por as atividades dos usuários individuais assim
                como todo conteúdo que ocorra sob sua conta. Isso inclui o
                conteúdo gerado por terceiros em sua conta. É essencial que você
                mantenha a confidencialidade de seus dados. Em caso de
                comprometimento de seus dados, ou acesso ilegal de sua conta,
                você deve notificar imediatamente a JOBCONVO através do site. A
                JOBCONVO não pode e não será responsável por qualquer perda ou
                dano decorrente do não cumprimento desta obrigação de segurança.
              </Text>
              <Text style={styles.titleStyle}>
                Pagamentos com cartão de crédito
              </Text>
              <Text style={styles.textStyle}>
                A JOBCONVO permite aos usuários pessoa jurídica a adquirirem
                pacotes de vagas, através de pagamentos via cartões de crédito.
                Em momento algum, as informações dos cartões de crédito são
                armazenadas e/ou divulgadas pela JOBCONVO. Todo o processo de
                pagamento é gerenciado por sites de parceiros, sendo estes os
                únicos e exclusivos donos de acesso a tais informações. O
                cancelamento dos planos pode ser feito automaticamente no portal
                JOCONVO na área de faturamento, clicando no link disponível no
                rodapé do site. A JOBCONVO não concede estornos de valores já
                faturados.
              </Text>
              <Text style={styles.textStyle}>
                O cancelamento por parte do usuário pessoa jurídica garante a
                utilização da plataforma enquanto o plano estiver vigente.
              </Text>
              <Text style={styles.titleStyle}>Serviço</Text>
              <Text style={styles.textStyle}>
                O serviço de entrevistas online provido por Via6 S/A, inscrita
                no cnpj sob o nº 07.158.049/0001-16, doravante denominada
                simplesmente JOBCONVO, deve ser utilizado e determinado, único e
                exclusivamente, pelos titulares das contas. A JOBCONVO não
                desempenha nenhum papel na inicialização de transmissão de
                conteúdos de entrevistas, assim como também não determina
                destinatários para realizar ou não entrevistas, não altera nem
                modifica qualquer informação contida em entrevistas.
              </Text>
              <Text style={styles.textStyle}>
                A JOBCONVO não expressa opinião alguma em relação à qualidade ou
                adequação de qualquer empregador ou entrevistado, e não endossa
                qualquer opinião, recomendação ou conselho expressados pelos
                usuários do site. JOBCONVO renuncia expressamente toda e
                qualquer responsabilidade em conexão a tal conteúdo. Assim, você
                concorda que a JOBCONVO não é responsável por quaisquer perdas,
                danos ou prejuízos a qualquer indivíduo, como resultado direto
                ou indireto de qualquer informação publicada no site ou
                disponibilizados através do site.
              </Text>
              <Text style={styles.textStyle}>
                A JOBCONVO se reserva o direito, a qualquer momento e de tempos
                em tempos, modificar ou descontinuar, temporariamente ou
                permanentemente, seu serviço (ou qualquer parte dele) com ou sem
                aviso prévio. Alterações de preço podem ocorrer após 15 dias
                comunicados por JOBCONVO. Este aviso pode ser fornecido ou
                através do site ou através de e-mail para titulares de contas.
                JOBCONVO não pode ser responsabilizada por você, ou qualquer
                terceiro, por realizar modificação, alteração de preços,
                suspensão ou descontinuação do serviço ou do site.
              </Text>
              <Text style={styles.titleStyle}>Testes</Text>
              <Text style={styles.textStyle}>
                A JOBCONVO testará periodicamente seu site, e se reserva no
                direito de incluir seus usuários nestes testes, sem aviso
                prévio.
              </Text>
              <Text style={styles.textStyle}>Direito de encerramento</Text>
              <Text style={styles.textStyle}>
                A JOBCONVO se reserva no direito de encerrar ou restringir a
                conta de seus clientes ou usuários, segundo exclusivo critério,
                mediante prévio aviso com antecedência de 30 (trinta) dias.
              </Text>
              <Text style={styles.titleStyle}>
                Links para sites de terceiros
              </Text>
              <Text style={styles.textStyle}>
                Este site pode conter links para sites de terceiros. Acesso a
                qualquer outro site da internet ligado a este site é por conta e
                risco do usuário e a JOBCONVO não é responsável pela exatidão ou
                confiabilidade de qualquer informação, dados, opiniões,
                conselhos ou declarações feitas nesses sites. JOBCONVO fornece
                esses links apenas como uma conveniência e a inclusão de tais
                links não implica o endosso.
              </Text>
              <Text style={styles.titleStyle}>Litígio</Text>
              <Text style={styles.textStyle}>
                Fica ajustado entre a JOBCONVO e seus usuários, que eventuais
                disputas ou litígios envolvendo o presente termo serão
                submetidos para processamento e julgamento perante o foro da
                comarca de Belo Horizonte, com renúncia a qualquer outro, por
                mais privilegiado que seja.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.fabMenuStyle}>
          <TouchableOpacity
            onPress={() => this.clickAccept()}
            style={{
              borderWidth: 1,
              borderColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              height: 25,
              width: '100%',
              backgroundColor: '#6948F4',
            }}>
            <Text style={{color: '#FFFFFF'}}>Concordo</Text>
          </TouchableOpacity>
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
  buttonStyle: {
    backgroundColor: '#6948F4',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#6948F4',
    maxHeight: 40,
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 10,
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
